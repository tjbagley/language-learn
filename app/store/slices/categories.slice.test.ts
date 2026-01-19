import { describe, it, expect } from 'vitest';
import categoriesReducer, { addCategory } from './categories.slice';
import type { Category } from '~/models/category';

describe('Categories Slice', () => {
  it('should handle initial state', () => {
    const initialState = {
      values: [{
        id: '1',
        description: 'Noun'
      }, {
        id: '2',
        description: 'Verb'
      }, {
        id: '3',
        description: 'Adjective'
      }, {
        id: '4',
        description: 'Other'
      }, {
        id: '5',
        description: 'Greetings'
      }, {
        id: '6',
        description: 'Numbers'
      }]
    };
    expect(categoriesReducer(undefined, { type: '' })).toEqual(initialState);
  });
  it('should handle add', () => {
    const previousState = {
      values: [{
        id: '1',
        description: 'Zebra'
      }, {
        id: '2',
        description: 'Apple'
      }]
    };
    const category: Category = { id: '7', description: 'Test' };
    expect(categoriesReducer(previousState, addCategory(category))).toEqual({
      values: [{
        id: '2',
        description: 'Apple'
      }, {
        id: '7',
        description: 'Test'
      }, {
        id: '1',
        description: 'Zebra'
      },]
    });
  });
});