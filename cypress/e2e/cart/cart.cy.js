import CartPageObjectModel from "../../support/page-objects-models/cart.pom";
import {
  NavigationMenuItem,
  NavigationSubmenuItem,
} from "../../support/consts/navigation.consts";

describe("Cart", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  describe("Cart Options", () => {
    it("should add multiple items", () => {
      cy.navigateBySubmenuItem(
        NavigationMenuItem.EBOOK,
        NavigationSubmenuItem.CHILDRENS_BOOK
      );
      cy.addBooksToCart(2);
      cy.loadCartPage();

      CartPageObjectModel.cartItemInfo().should("have.length", 2);
    });

    it("should remove item from cart", () => {
      cy.navigateBySubmenuItem(
        NavigationMenuItem.EBOOK,
        NavigationSubmenuItem.CHILDRENS_BOOK
      );

      cy.addBooksToCart(2);
      cy.loadCartPage();

      CartPageObjectModel.cartItemInfo().should("have.length", 2);
      CartPageObjectModel.getDeleteButton(1).click();
      CartPageObjectModel.cartItemInfo().should("have.length", 1);
    });
  });
});
