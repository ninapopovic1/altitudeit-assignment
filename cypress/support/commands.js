import 'cypress-real-events';
import NavigationPageObjectModel from './page-objects-models/navigation.pom';
import CartPageObjectModel from './page-objects-models/cart.pom';
import BooksPageObjectModel from './page-objects-models/books.pom';

Cypress.Commands.add('navigateByMenuItem', (menuItem) => {
  NavigationPageObjectModel.navigateByMenuItemClick(menuItem);
});

Cypress.Commands.add('navigateBySubmenuItem', (menuItem, submenuItem) => {
  NavigationPageObjectModel.navigateToSubmenuItem(menuItem, submenuItem);
});

Cypress.Commands.add('checkItemInCartByTitle', (title) => {
  CartPageObjectModel.findItemByTitle(title);
});

Cypress.Commands.add('loadCartPage', () => {
  CartPageObjectModel.loadCartPage();
});

Cypress.Commands.add('addBooksToCart', (number) => {
  BooksPageObjectModel.addBooksToCart(number);
});

Cypress.Commands.add('hideSubmenu', () => {
  cy.get('body').realMouseMove(0, 100, { position: 'center' });
});
