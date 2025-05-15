import {
  CART_HEADER_ICON_CSS,
  CART_ITEM_INFO_PARENT_CSS,
  CART_ITEM_TITLE_CSS,
  CART_URL,
} from "../consts/cart.consts";

class CartPageObjectModel {
  cartHeader = () => cy.get(CART_HEADER_ICON_CSS);
  cartItemInfo = () => cy.get(CART_ITEM_INFO_PARENT_CSS);
  cartItemTitle = () => cy.get(CART_ITEM_TITLE_CSS);

  findItemByTitle(title) {
    cy.intercept("GET", "**/checkout/cart.json").as("loadCartPage");

    this.cartHeader().click();

    cy.wait("@loadCartPage");

    cy.url().should("include", CART_URL);

    this.cartItemInfo()
      .find(CART_ITEM_TITLE_CSS)
      .filter(`:contains(${title})`)
      .should("have.length.greaterThan", 0);
  }
}

export default new CartPageObjectModel();
