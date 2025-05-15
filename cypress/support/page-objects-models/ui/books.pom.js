import { UNEXPECTED_STATUS_CODE_ERROR } from '../../consts/ui/errors.consts';
import { BOOK_AMOUNT_CLASS, BOOK_WRAPPER_CLASS, ADD_TO_CART_BOOK_BUTTON_CLASS, BOOK_TITLE_CLASS } from '../../consts/ui/books.consts';

class BooksPageObjectModel {
  /**
   * Selectors
   */
  bookAmountText = () => cy.get(BOOK_AMOUNT_CLASS);
  bookWrapper = () => cy.get(BOOK_WRAPPER_CLASS);
  bookTitle = () => cy.get(BOOK_TITLE_CLASS);
  addToCartBookButton = () => cy.get(ADD_TO_CART_BOOK_BUTTON_CLASS);

  /**
   * Check book amount on the category page that we get from BE response for submenu item
   * @param {*} menuItem - main menu link
   * @param {*} submenuItem - child of submenu link
   */
  checkBookAmount(menuItem, submenuItem) {
    cy.intercept('POST', 'category/*').as('loadBooks');

    cy.navigateBySubmenuItem(menuItem, submenuItem);

    cy.wait('@loadBooks').then((intercept) => {
      const statusCode = intercept.response?.statusCode;
      const responseBookAmount = intercept.response?.body.total.toString() ?? '';

      if (!intercept?.response || statusCode >= 300) {
        throw new Error(`${UNEXPECTED_STATUS_CODE_ERROR} - ${statusCode}`);
      }

      this.bookAmountText().should('include.text', responseBookAmount);
    });
  }

  /**
   * Order first book on category page and then go on cart and check if book is in cart
   */
  orderFirstBookInSection() {
    this.waitForLoadBooksRequest();

    this.bookWrapper()
      .first()
      .find(BOOK_TITLE_CLASS)
      .invoke('text')
      .then((text) => {
        this.bookWrapper().first().realHover();
        this.bookWrapper().first().find(ADD_TO_CART_BOOK_BUTTON_CLASS).should('be.visible').click();

        cy.checkItemInCartByTitle(text);
      });
  }

  /**
   * Used for adding required number of books to cart, it will add in order that are displayed on page
   * @param {*} number - number of books
   */
  addBooksToCart(number) {
    this.waitForLoadBooksRequest();

    for (let i = 0; i < number; i++) {
      this.bookWrapper().eq(i).realHover();
      this.bookWrapper().eq(i).find(ADD_TO_CART_BOOK_BUTTON_CLASS).should('be.visible').click();
    }
  }

  /**
   * Intercept used to wait for fetch books call
   */
  waitForLoadBooksRequest() {
    cy.intercept('POST', 'category/*').as('loadBooks');
    cy.wait('@loadBooks');
  }
}

export default new BooksPageObjectModel();
