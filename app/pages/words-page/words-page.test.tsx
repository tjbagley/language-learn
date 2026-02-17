import { beforeEach, describe, expect, it, vi } from 'vitest';
import WordsPage from './words-page';

describe('WordsPage', () => {
  beforeEach(() => {
    vi.mock('react-router', () => ({
      useNavigate: () => vi.fn(),
    }));
  });
  it('matches snapshot', () => {
    const result = WordsPage();
    expect(result).toMatchSnapshot();
  });
});