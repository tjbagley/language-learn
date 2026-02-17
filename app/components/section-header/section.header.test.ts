import { describe, expect, it } from 'vitest'
import { SectionHeader } from './section-header'

describe('SectionHeader', () => {
  it('matches snapshot', () => {
    const result = SectionHeader({ heading: 'Test Heading', buttonLabel: 'Click Me', onButtonClick: () => {} });
    expect(result).toMatchSnapshot();
  });
});