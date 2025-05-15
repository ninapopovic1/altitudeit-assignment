import {
  CART_HEADER_ICON_CSS,
  CART_ITEM_INFO_PARENT_CSS,
  CART_ITEM_TITLE_CSS,
  CART_URL,
  CART_ITEM_REMOVE_CSS,
} from "../consts/cart.consts";

class CartPageObjectModel {
  cartHeader = () => cy.get(CART_HEADER_ICON_CSS);
  cartItemInfo = () => cy.get(CART_ITEM_INFO_PARENT_CSS);
  cartItemTitle = () => cy.get(CART_ITEM_TITLE_CSS);
  removeCartItem = () => cy.get(CART_ITEM_REMOVE_CSS);
  cartItemRow = () => cy.get("tr");

  findItemByTitle(title) {
    this.loadCartPage();
    this.cartItemInfo()
      .find(CART_ITEM_TITLE_CSS)
      .filter(`:contains(${title})`)
      .should("have.length.greaterThan", 0);
  }

  loadCartPage() {
    cy.intercept("GET", "**/checkout/cart.json").as("loadCartPage");
    this.cartHeader().click();
    cy.wait("@loadCartPage");
    cy.url().should("include", CART_URL);
    cy.hideSubmenu();
  }

  getDeleteButton(index) {
    return this.cartItemRow().eq(index).find(CART_ITEM_REMOVE_CSS);
  }
}

export default new CartPageObjectModel();
