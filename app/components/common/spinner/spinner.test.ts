import { describe, expect, it } from 'vitest'
import { Spinner } from './spinner'

describe('Spinner', () => {
  it('matches snapshot', () => {
    const result = Spinner({size: 'small'});
    expect(result).toMatchSnapshot();
  });
});