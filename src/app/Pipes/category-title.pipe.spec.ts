import { CategoryTitlePipe } from './category-title.pipe';

describe('ParentCategoryPipe', () => {
  it('create an instance', () => {
    const pipe = new CategoryTitlePipe();
    expect(pipe).toBeTruthy();
  });
});
