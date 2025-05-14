import BooksPageObjectModel from "../../support/page-objects-models/books.pom";
import {
  NavigationMenuItem,
  NavigationSubmenuItem,
} from "../../support/consts/navigation.consts";

describe("Books page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  describe("Check Amount", () => {
    it("should check book amount for fiction subsection", () => {
      BooksPageObjectModel.checkBookAmount(
        NavigationMenuItem.BOOK,
        NavigationSubmenuItem.FICTION
      );
    });

    it("should check book amount for travel guid subsection", () => {
      BooksPageObjectModel.checkBookAmount(
        NavigationMenuItem.BOOK,
        NavigationSubmenuItem.TRAVEL_GUIDE
      );
    });

    it("should check book amount for childrens book subsection", () => {
      BooksPageObjectModel.checkBookAmount(
        NavigationMenuItem.EBOOK,
        NavigationSubmenuItem.CHILDRENS_BOOK
      );
    });
  });
});
