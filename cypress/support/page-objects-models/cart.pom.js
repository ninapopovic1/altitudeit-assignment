import {
  CART_HEADER_ICON_CSS,
  CART_ITEM_INFO_PARENT_CSS,
  CART_ITEM_TITLE_CSS,
  CART_URL,
  CART_ITEM_REMOVE_CSS,
  CART_ITEM_ADD_REMOVE_BUTTON_CSS,
  CART_TOTAL_PRICE_CSS,
  CART_ITEM_PRICE_CSS,
  CART_ITEMS_TOTAL_WRAPPER_PRICE_CSS,
} from '../consts/cart.consts';

class CartPageObjectModel {
  cartHeader = () => cy.get(CART_HEADER_ICON_CSS);
  cartItemInfo = () => cy.get(CART_ITEM_INFO_PARENT_CSS);
  cartItemTitle = () => cy.get(CART_ITEM_TITLE_CSS);
  removeCartItem = () => cy.get(CART_ITEM_REMOVE_CSS);
  cartItemRow = () => cy.get('tr');
  totalItemsPriceWrapper = () => cy.get(CART_ITEMS_TOTAL_WRAPPER_PRICE_CSS);
  cartItemPrice = () => cy.get(CART_ITEM_PRICE_CSS);

  findItemByTitle(title) {
    this.loadCartPage();
    this.cartItemInfo().find(CART_ITEM_TITLE_CSS).filter(`:contains(${title})`).should('have.length.greaterThan', 0);
  }

  loadCartPage() {
    cy.intercept('GET', '**/checkout/cart.json').as('loadCartPage');
    this.cartHeader().click();
    cy.wait('@loadCartPage');
    cy.url().should('include', CART_URL);
    cy.hideSubmenu();
  }

  getDeleteButton(index) {
    return this.cartItemRow().eq(index).find(CART_ITEM_REMOVE_CSS);
  }

  clickOnAddMore(index) {
    cy.intercept('POST', '/update').as('addMoreButtonUpdate');
    cy.intercept('POST', '/read').as('addMoreButtonRead');
    this.cartItemRow().eq(index).find(CART_ITEM_ADD_REMOVE_BUTTON_CSS).filter(':contains(+)').click();

    cy.wait(['@addMoreButtonUpdate', '@addMoreButtonRead']);
  }

  checkItemsTotalPrice(expectedPrice) {
    this.totalItemsPriceWrapper().eq(0).find(CART_TOTAL_PRICE_CSS).eq(1).should('include.text', expectedPrice);
  }
}

export default new CartPageObjectModel();
