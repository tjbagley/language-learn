import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Start } from './start'

describe('Start', () => {
  beforeEach(() => {
    vi.mock('react-router', () => ({
      useNavigate: () => vi.fn(),
    }));
  });
  it('matches snapshot', () => {
    const result = Start();
    expect(result).toMatchSnapshot();
  });
});