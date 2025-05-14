import { UNEXPECTED_STATUS_CODE_ERROR } from "../consts/errors.consts";
import { BOOK_AMOUNT_CLASS } from "../consts/books.consts";

class BooksPageObjectModel {
  bookAmountText = () => cy.get(BOOK_AMOUNT_CLASS);

  checkBookAmount(menuItem, submenuItem) {
    cy.intercept("POST", "category/*").as("bookAmmount");

    cy.navigateBySubmenuItem(menuItem, submenuItem);

    cy.wait("@bookAmmount").then((intercept) => {
      const statusCode = intercept.response?.statusCode;
      const responseBookAmount =
        intercept.response?.body.total.toString() ?? "";

      if (!intercept?.response || statusCode >= 300) {
        throw new Error(`${UNEXPECTED_STATUS_CODE_ERROR} - ${statusCode}`);
      }

      this.bookAmountText().should("include.text", responseBookAmount);
    });
  }
}

export default new BooksPageObjectModel();
