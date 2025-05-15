import {
  MENU_ITEM_BOOKS_CLASS,
  CATEGORIE_PREIX,
  BOOKS_URL,
  NavigationMenuItem,
  MENU_ITEM_EBOOKS_CLASS,
  EBOOKS_URL,
  SUBMENU_CLASS,
  MENU_ITEMS_PARENT_CLASS,
  NavigationSubmenuItem,
  FICTION_URL,
  TRAVEL_GUIDE_URL,
  CHILDRENS_BOOK_URL,
  SUBMENU_ITEM_CLASS,
} from '../../consts/ui/navigation.consts';

class NavigationPageObjectModel {
  /**
   * Selectors
   */

  //Menu item button wrappers
  menuItemBookParent = () => cy.get(MENU_ITEMS_PARENT_CLASS).first();
  menuItemEbooksParent = () => cy.get(MENU_ITEMS_PARENT_CLASS).eq(1);

  //Menu item buttons
  booksMenuItem = () => cy.get(MENU_ITEM_BOOKS_CLASS);
  //Taking first because there are multiple items with same class with no dinstiction
  eBooksMenuItem = () => cy.get(MENU_ITEM_EBOOKS_CLASS).first();

  //Submenu
  booksSubmenu = () => cy.get(SUBMENU_CLASS).first();
  ebooksSubmenu = () => cy.get(SUBMENU_CLASS).eq(1);

  //Books submenu items
  fictionSubmenuItem = () => this.booksSubmenu().find(SUBMENU_ITEM_CLASS).first();
  travelGuideSubmenuItem = () => this.booksSubmenu().find(SUBMENU_ITEM_CLASS).eq(2);

  //Ebooks submenu items
  childrensBookSubmenuItem = () => this.ebooksSubmenu().find(SUBMENU_ITEM_CLASS).first();

  //Methods

  /**
   * Navigate to url when clicking on the main menu links
   * @param {*} menuItem - Name of the menu item we want to click
   */
  navigateByMenuItemClick(menuItem) {
    const pageUrl = this.clickOnMenuItemAndReturnUrl(menuItem);
    this.checkIsUrlCorrect(pageUrl);
  }

  /**
   * Find selector based on the menuItem and click on it
   * @param {*} menuItem  - Name of the menu item we want to click
   * @returns - Url for the page
   */
  clickOnMenuItemAndReturnUrl(menuItem) {
    switch (menuItem) {
      case NavigationMenuItem.BOOK:
        this.booksMenuItem().click();
        return BOOKS_URL;
      case NavigationMenuItem.EBOOK:
        this.eBooksMenuItem().click();
        return EBOOKS_URL;
    }
  }

  /**
   * Navigate to url when clicking on the submenu links
   * @param {*} menuItem - Name of the menu item we want to click
   * @param {*} submenuItem - Name of the submenu item we want to click
   */
  navigateBySubmenuItem(menuItem, submenuItem) {
    this.hoverOnMenuItemAndCheckSubmenu(menuItem);

    const pageUrl = this.clickOnSubmenuItem(submenuItem);
    this.checkIsUrlCorrect(pageUrl);
    cy.hideSubmenu();
  }

  /**
   * Find main menu item and hover over it to display submenu
   * @param {*} menuItem - Name of the menu item we want to hover over
   */
  hoverOnMenuItemAndCheckSubmenu(menuItem) {
    switch (menuItem) {
      case NavigationMenuItem.BOOK:
        this.menuItemBookParent().realHover();
        this.booksSubmenu().should('be.visible');
        break;
      case NavigationMenuItem.EBOOK:
        this.menuItemEbooksParent().realHover();
        this.ebooksSubmenu().should('be.visible');
        break;
    }
  }

  /**
   * Find selector based on the submenuItem and click on it
   * @param {*} submenuItem  - Name of the submenu item we want to click
   * @returns - Url for the page
   */
  clickOnSubmenuItem(submenuItem) {
    switch (submenuItem) {
      case NavigationSubmenuItem.FICTION:
        this.fictionSubmenuItem().click();
        return FICTION_URL;
      case NavigationSubmenuItem.TRAVEL_GUIDE:
        this.travelGuideSubmenuItem().click();
        return TRAVEL_GUIDE_URL;
      case NavigationSubmenuItem.CHILDRENS_BOOK:
        this.childrensBookSubmenuItem().click();
        return CHILDRENS_BOOK_URL;
    }
  }

  /**
   * Check if url is ok after redirection on menu item click
   * @param {*} pageUrl - Url that needs to be
   */
  checkIsUrlCorrect(pageUrl) {
    cy.url().should('include', CATEGORIE_PREIX);

    //Need to decode because German letters
    cy.url().then((url) => {
      const decodeUrl = decodeURIComponent(url);
      expect(decodeUrl).to.include(pageUrl);
    });
  }
}

export default new NavigationPageObjectModel();
