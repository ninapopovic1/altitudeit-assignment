import 'cypress-real-events';
import NavigationPageObjectModel from './page-objects-models/ui/navigation.pom';
import CartPageObjectModel from './page-objects-models/ui/cart.pom';
import BooksPageObjectModel from './page-objects-models/ui/books.pom';

/**
 * Navigation for main menu item
 */
Cypress.Commands.add('navigateByMenuItem', (menuItem) => {
  NavigationPageObjectModel.navigateByMenuItemClick(menuItem);
});

/**
 * Navigation for submenu item
 */
Cypress.Commands.add('navigateBySubmenuItem', (menuItem, submenuItem) => {
  NavigationPageObjectModel.navigateBySubmenuItem(menuItem, submenuItem);
});

/**
 * Find book in cart by title
 */
Cypress.Commands.add('checkItemInCartByTitle', (title) => {
  CartPageObjectModel.findItemByTitle(title);
});

/**
 * Load cart page by clicking on icon inside header
 */
Cypress.Commands.add('loadCartPage', () => {
  CartPageObjectModel.loadCartPage();
});

/**
 * Add wanted number of books in cart, they will be added one by one as they are display on page
 */
Cypress.Commands.add('addBooksToCart', (number) => {
  BooksPageObjectModel.addBooksToCart(number);
});

/**
 * Mock mouse move to hide open popups like submenu, cart summary, etc.
 */
Cypress.Commands.add('hideSubmenu', () => {
  cy.get('body').realMouseMove(0, 100, { position: 'center' });
});
