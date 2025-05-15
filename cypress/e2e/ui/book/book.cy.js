import BooksPageObjectModel from '../../../support/page-objects-models/ui/books.pom';
import { NavigationMenuItem, NavigationSubmenuItem } from '../../../support/consts/ui/navigation.consts';
import '../../../support/hooks/ui-hook';

describe('Books page', () => {
  describe('Check Amount', () => {
    it('should check book amount for fiction subsection', () => {
      BooksPageObjectModel.checkBookAmount(NavigationMenuItem.BOOK, NavigationSubmenuItem.FICTION);
    });

    it('should check book amount for travel guid subsection', () => {
      BooksPageObjectModel.checkBookAmount(NavigationMenuItem.BOOK, NavigationSubmenuItem.TRAVEL_GUIDE);
    });

    it('should check book amount for childrens book subsection', () => {
      BooksPageObjectModel.checkBookAmount(NavigationMenuItem.EBOOK, NavigationSubmenuItem.CHILDRENS_BOOK);
    });
  });

  describe('Order Book', () => {
    it('should order first book from children book section', () => {
      cy.navigateBySubmenuItem(NavigationMenuItem.EBOOK, NavigationSubmenuItem.CHILDRENS_BOOK);
      BooksPageObjectModel.orderFirstBookInSection();
    });
  });
});
