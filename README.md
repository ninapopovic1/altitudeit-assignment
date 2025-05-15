About BookBox

    BookBox is an e-commerce web application where users can:

    - Browse books by categories
    - View book details
    - Add/remove books from cart
    - Checkout and pay with credit card

Asignment

    Assignment for this task was to create automation tests for some core functionalities.
    The funcionalities that are coverd under these tests are:

        - Menu navigation including submenu links
        - Checking books amount on the page for category
        - Adding book to cart
        - Removing book from cart
        - Add multiple books to cart
        - Add multiple same book inside the cart on add more button

    There are also couple API tests for fetching books for selected category.

Testing tools

    Testing tool: Cypress

    Pros
        Easy to Write and Maintain Tests
        Fast Feedback Loop
        Good CI/CD Integration
        Great for End-to-End Testing

    Cons
        Limited Browser Support
        No Multi-Tab or Cross-Domain Testing
        Frontend Focused

Setup

    To run this project:
        - First clone git repo
        - Open terminal and install required dependecies with command npm i
        - To run tests use npm run cypress:open for GUI or npm run cypress:run for headles

Problems

    Some of the issue that are faces:

        - Lack of test ids, need to use css selectors and that can sometimes lead to not wanted results.
        - HTML structure on some elements is not aligned with others
        - Lack of selectors inside HTML (example: tr do not have any selectors)
        - Issues with hover
