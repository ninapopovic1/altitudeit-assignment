import BooksApiPageObjectModel from '../../../support/page-objects-models/api/book.api.pom';
import { BooksCategory } from '../../../support/consts/api/book.api.consts';

describe('Book API', () => {
  describe('Get Books By Category', () => {
    it('should fetch childrens books', () => {
      BooksApiPageObjectModel.getBooksByCategory(BooksCategory.CHILDRENS_BOOK).then((response) => {
        BooksApiPageObjectModel.checkGetBookByCategoryResponse(response);

        const hasChildrenBook = response.body.data.some((book) => book.title === 'Du auf der anderen Seite');
        expect(hasChildrenBook).to.be.true;
      });
    });

    it('should fetch travel guide books', () => {
      BooksApiPageObjectModel.getBooksByCategory(BooksCategory.TRAVEL_GUID).then((response) => {
        BooksApiPageObjectModel.checkGetBookByCategoryResponse(response);

        const hasTravelGuideBook = response.body.data.some((book) => book.title === 'Sri Lanka - Ein Bildband');
        expect(hasTravelGuideBook).to.be.true;
      });
    });
  });
});
