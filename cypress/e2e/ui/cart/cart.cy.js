import CartPageObjectModel from '../../../support/page-objects-models/cart.pom';
import { NavigationMenuItem, NavigationSubmenuItem } from '../../../support/consts/navigation.consts';
import { CART_ITEM_TOTAL_AMOUNT_IN_CART_CSS, CART_ITEM_PRICE_CSS, CART_ITEM_OPTIONS_WRAPPER_DISABLED_CSS } from '../../../support/consts/cart.consts';

describe('Cart', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Cart Options', () => {
    it('should add multiple items', () => {
      cy.navigateBySubmenuItem(NavigationMenuItem.EBOOK, NavigationSubmenuItem.CHILDRENS_BOOK);
      cy.addBooksToCart(2);
      cy.loadCartPage();

      CartPageObjectModel.cartItemInfo().should('have.length', 2);
    });

    it('should remove item from cart', () => {
      cy.navigateBySubmenuItem(NavigationMenuItem.EBOOK, NavigationSubmenuItem.CHILDRENS_BOOK);

      cy.addBooksToCart(2);
      cy.loadCartPage();

      CartPageObjectModel.cartItemInfo().should('have.length', 2);
      CartPageObjectModel.getDeleteButton(1).click();
      CartPageObjectModel.cartItemInfo().should('have.length', 1);
    });

    it('should add more same item on add button click', () => {
      const selectedRow = 1;

      cy.navigateBySubmenuItem(NavigationMenuItem.BOOK, NavigationSubmenuItem.TRAVEL_GUIDE);

      cy.addBooksToCart(1);
      cy.loadCartPage();

      CartPageObjectModel.cartItemInfo().should('have.length', 1);

      CartPageObjectModel.cartItemRow()
        .eq(selectedRow)
        .find(CART_ITEM_PRICE_CSS)
        .invoke('text')
        .then((text) => {
          const itemPrice = parseFloat(text.split(/\s+/)[1]);

          CartPageObjectModel.clickOnAddMore(selectedRow);
          CartPageObjectModel.cartItemRow().eq(1).find(CART_ITEM_TOTAL_AMOUNT_IN_CART_CSS).should('have.text', '2');
          CartPageObjectModel.checkItemsTotalPrice(itemPrice * 2);
        });
    });

    it('should check if item options are disabled', () => {
      const selectedRow = 1;

      cy.navigateBySubmenuItem(NavigationMenuItem.EBOOK, NavigationSubmenuItem.CHILDRENS_BOOK);

      cy.addBooksToCart(1);
      cy.loadCartPage();

      CartPageObjectModel.cartItemInfo().should('have.length', 1);
      CartPageObjectModel.cartItemRow().eq(selectedRow).find(CART_ITEM_OPTIONS_WRAPPER_DISABLED_CSS).should('have.css', 'cursor', 'not-allowed');
    });
  });
});
