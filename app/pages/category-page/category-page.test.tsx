import { beforeEach, describe, expect, it, vi } from 'vitest';
import CategoryPage from './category-page';
import { renderWithProviders } from 'test/test-utils';

describe('CategoryPage', () => {
  beforeEach(() => {
    vi.mock('react-router', () => ({
      useNavigate: () => vi.fn(),
      useParams: () => vi.fn(),
    }));
    vi.mock('react', () => ({
      useRef: () => vi.fn(),
      useEffect: () => vi.fn(),
      useState: (init: any) => [init, vi.fn()],
    }));
  });
  it('matches snapshot', () => {
    const result = renderWithProviders(<CategoryPage />);
    expect(result).toMatchSnapshot();
  });
});