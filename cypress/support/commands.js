import "cypress-real-events";
import NavigationPageObjectModel from "./page-objects-models/navigation.pom";

Cypress.Commands.add("navigateByMenuItem", (menuItem) => {
  NavigationPageObjectModel.navigateByMenuItemClick(menuItem);
});

Cypress.Commands.add("navigateBySubmenuItem", (menuItem, submenuItem) => {
  NavigationPageObjectModel.navigateToSubmenuItem(menuItem, submenuItem);
});
