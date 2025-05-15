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
} from "../consts/navigation.consts";

class NavigationPageObjectModel {
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
  fictionSubmenuItem = () =>
    this.booksSubmenu().find(SUBMENU_ITEM_CLASS).first();
  travelGuideSubmenuItem = () =>
    this.booksSubmenu().find(SUBMENU_ITEM_CLASS).eq(2);

  //Ebooks submenu items
  childrensBookSubmenuItem = () =>
    this.ebooksSubmenu().find(SUBMENU_ITEM_CLASS).first();

  //Methods
  navigateByMenuItemClick(menuItem) {
    const pageUrl = this.clickOnMenuItemAndReturnUrl(menuItem);
    this.checkIsUrlCorrect(pageUrl);
  }

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

  navigateToSubmenuItem(menuItem, submenuItem) {
    this.hoverOnMenuItemAndCheckSubmenu(menuItem);

    const pageUrl = this.clickOnSubmenuItem(submenuItem);
    this.checkIsUrlCorrect(pageUrl);
    cy.hideSubmenu();
  }

  hoverOnMenuItemAndCheckSubmenu(menuItem) {
    switch (menuItem) {
      case NavigationMenuItem.BOOK:
        this.menuItemBookParent().realHover();
        this.booksSubmenu().should("be.visible");
        break;
      case NavigationMenuItem.EBOOK:
        this.menuItemEbooksParent().realHover();
        this.ebooksSubmenu().should("be.visible");
        break;
    }
  }

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

  checkIsUrlCorrect(pageUrl) {
    cy.url().should("include", CATEGORIE_PREIX);

    //Need to decode because German letters
    cy.url().then((url) => {
      const decodeUrl = decodeURIComponent(url);
      expect(decodeUrl).to.include(pageUrl);
    });
  }
}

export default new NavigationPageObjectModel();
