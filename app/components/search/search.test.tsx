import { beforeEach, describe, expect, it, vi } from 'vitest';
import { screen, fireEvent, waitFor, within } from '@testing-library/react'
import { renderWithProviders } from 'test/test-utils';
import { Search } from './search';

describe(`Search`, () => {
  beforeEach(() => {
    vi.mock('react', () => ({
      useRef: () => vi.fn(),
    }));
    vi.mock('react-router', () => ({
      useNavigate: () => vi.fn(),
    }));
  });
  it(`matches snapshot`, () => {
    const result = renderWithProviders(<Search />);
    expect(result).toMatchSnapshot();
  });
  it(`should show search results`, async () => {
    const result = renderWithProviders(<Search />);
    const input = screen.getByPlaceholderText('Search for word or phrase');

    fireEvent.change(input, { target: { value: 'bon' } });

    const list = await screen.findByRole('list');

    expect(input).toBeInTheDocument();

    await waitFor(() => {
      expect(list).toBeInTheDocument();
      expect(list.children.length).toBeGreaterThan(0);

      const firstItem = screen.getByTestId("search-item-0");
      const valueElement = within(firstItem).getByText("bonjour");
      expect(valueElement).toBeInTheDocument();
    });
  });
});