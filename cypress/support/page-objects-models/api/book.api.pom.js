import { GET_BOOKS_BY_CATEGORY_API } from '../../consts/api/book.api.consts';
import { API_BASE_URL } from '../../consts/api/shared.api.consts';

class BooksApiPageObjectModel {
  getBooksByCategory(category) {
    return cy.request({
      method: 'POST',
      url: `${API_BASE_URL}/${GET_BOOKS_BY_CATEGORY_API}/${category}`,
      body: { orderBy: { key: '', type: '' }, limit: 20, offset: 1, page: 1 },
    });
  }

  checkGetBookByCategoryResponse(response) {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.all.keys('data', 'errors', 'next_offset', 'status', 'total');
  }
}

export default new BooksApiPageObjectModel();
