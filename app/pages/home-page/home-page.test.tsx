import { beforeEach, describe, expect, it, vi } from 'vitest';
import HomePage from './home-page';

describe('HomePage', () => {
  beforeEach(() => {
    vi.mock('react-router', () => ({
      useNavigate: () => vi.fn(),
    }));
  });
  it('matches snapshot', () => {
    const result = HomePage();
    expect(result).toMatchSnapshot();
  });
});