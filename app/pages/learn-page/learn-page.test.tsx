import { beforeEach, describe, expect, it, vi } from 'vitest';
import LearnPage from './learn-page';
import { renderWithProviders } from 'test/test-utils';

describe('LearnPage', () => {
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
    const result = renderWithProviders(<LearnPage />);
    expect(result).toMatchSnapshot();
  });
});