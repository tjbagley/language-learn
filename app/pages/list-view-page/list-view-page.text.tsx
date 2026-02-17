import { beforeEach, describe, expect, it, vi } from 'vitest';
import ListViewPage from './list-view-page';

describe('ListViewPage', () => {
  beforeEach(() => {
    vi.mock('react-router', () => ({
      useNavigate: () => vi.fn(),
    }));
  });
  it('matches snapshot', () => {
    const result = ListViewPage();
    expect(result).toMatchSnapshot();
  });
});