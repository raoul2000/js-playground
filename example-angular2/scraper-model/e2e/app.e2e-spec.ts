import { ScraperModelPage } from './app.po';

describe('scraper-model App', () => {
  let page: ScraperModelPage;

  beforeEach(() => {
    page = new ScraperModelPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
