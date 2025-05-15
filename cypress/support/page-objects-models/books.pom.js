import { UNEXPECTED_STATUS_CODE_ERROR } from "../consts/errors.consts";
import {
  BOOK_AMOUNT_CLASS,
  BOOK_WRAPPER_CLASS,
  ADD_TO_CART_BOOK_BUTTON_CLASS,
  BOOK_TITLE_CLASS,
} from "../consts/books.consts";

class BooksPageObjectModel {
  bookAmountText = () => cy.get(BOOK_AMOUNT_CLASS);
  bookWrapper = () => cy.get(BOOK_WRAPPER_CLASS);
  bookTitle = () => cy.get(BOOK_TITLE_CLASS);
  addToCartBookButton = () => cy.get(ADD_TO_CART_BOOK_BUTTON_CLASS);

  checkBookAmount(menuItem, submenuItem) {
    cy.intercept("POST", "category/*").as("loadBooks");

    cy.navigateBySubmenuItem(menuItem, submenuItem);

    cy.wait("@loadBooks").then((intercept) => {
      const statusCode = intercept.response?.statusCode;
      const responseBookAmount =
        intercept.response?.body.total.toString() ?? "";

      if (!intercept?.response || statusCode >= 300) {
        throw new Error(`${UNEXPECTED_STATUS_CODE_ERROR} - ${statusCode}`);
      }

      this.bookAmountText().should("include.text", responseBookAmount);
    });
  }

  orderFirstBookInSection() {
    cy.intercept("POST", "category/*").as("loadBooks");
    cy.wait("@loadBooks");

    this.bookWrapper()
      .first()
      .find(BOOK_TITLE_CLASS)
      .invoke("text")
      .then((text) => {
        this.bookWrapper().first().realHover();
        this.bookWrapper()
          .first()
          .find(ADD_TO_CART_BOOK_BUTTON_CLASS)
          .should("be.visible")
          .click();

        cy.checkItemInCartByTitle(text);
      });
  }
}

export default new BooksPageObjectModel();
