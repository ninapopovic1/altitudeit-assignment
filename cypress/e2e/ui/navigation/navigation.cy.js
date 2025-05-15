import { NavigationMenuItem, NavigationSubmenuItem } from '../../../support/consts/navigation.consts';

describe('Menu navigation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Navigate By Item Click', () => {
    it('should navigate to Books page', () => {
      cy.navigateByMenuItem(NavigationMenuItem.BOOK);
    });

    it('should navigate to E-Books page', () => {
      cy.navigateByMenuItem(NavigationMenuItem.EBOOK);
    });
  });

  describe('Navigate By Subitem Click', () => {
    describe('Books Menu Item', () => {
      it('should navigate to fiction subsection', () => {
        cy.navigateBySubmenuItem(NavigationMenuItem.BOOK, NavigationSubmenuItem.FICTION);
      });

      it('should navigate to travel guid subsection', () => {
        cy.navigateBySubmenuItem(NavigationMenuItem.BOOK, NavigationSubmenuItem.TRAVEL_GUIDE);
      });
    });

    describe('Ebooks Menu Item', () => {
      it('should navigate to childrens book subsection', () => {
        cy.navigateBySubmenuItem(NavigationMenuItem.EBOOK, NavigationSubmenuItem.CHILDRENS_BOOK);
      });
    });
  });
});
