import {
  Entry,
  recursiveRemoveUndefinedEntries,
  getOrdenedEntriesByPrecedence,
  recursiveCalculateEntries,
  validateExpression,
  calculateExpression,
} from './expression';

describe('recursiveRemoveUndefinedEntries', () => {
  test('should filter undefined values recursively', () => {
    const entries = [
      '1',
      undefined,
      '2',
      [undefined, [undefined], '3'],
      ['4', '5', undefined],
    ];
    const result = ['1', '2', [[], '3'], ['4', '5']];

    expect(recursiveRemoveUndefinedEntries(entries as Entry[])).toEqual(result);
  });
});

describe('getOrdenedEntriesByPrecedence', () => {
  test('should return ordened entries by precedence', () => {
    const entries = new Map<string, Entry>([
      ['2+2*2', ['2', '+', ['2', '*', '2']]],
      ['3*5+2*6', [['3', '*', '5'], '+', ['2', '*', '6']]],
      ['10/5+9', [['10', '/', '5'], '+', '9']],
      ['4*4+1-1', [['4', '*', '4'], '+', '1', '-', '1']],
      ['1+1-1*1/1', ['1', '+', '1', '-', [['1', '*', '1'], '/', '1']]],
    ]);

    Array.from(entries.entries()).forEach(([expression, result]) => {
      expect(getOrdenedEntriesByPrecedence(expression)).toEqual(result);
    });
  });
});

describe('recursiveCalculateEntries', () => {
  test('should return calculated entries recursively', () => {
    const entries = new Map<Entry[], string>([
      [['2', '+', ['2', '*', '2']], '6'],
      [[['3', '*', '5'], '+', ['2', '*', '6']], '27'],
      [[['10', '/', '5'], '+', '9'], '11'],
      [[['4', '*', '4'], '+', '1', '-', '1'], '16'],
      [['1', '+', '1', '-', [['1', '*', '1'], '/', '1']], '1'],
    ]);

    Array.from(entries.entries()).forEach(([entries, result]) => {
      expect(recursiveCalculateEntries(entries)).toEqual(result);
    });
  });

  test('should throw error on zero division', () => {
    const entries = ['2', '+', ['2', '/', '0']];
    expect(() => {
      recursiveCalculateEntries(entries);
    }).toThrowError('Zero division Error');
  });
});

describe('validateExpression', () => {
  test('should throw error when invalid expressions', () => {
    const entries = ['2+2+', '+2+2', '2+2 2', '2+A'];

    entries.forEach((expression) => {
      expect(() => {
        validateExpression(expression);
      }).toThrowError('Invalid expression');
    });
  });
});

describe('calculateExpression', () => {
  test('should call getOrdenedEntriesByPrecedence and recursiveCalculateEntries', () => {});
  test('should calculate expression', () => {
    const entries = new Map<string, string>([
      ['2+2*2', '6'],
      ['3*5+2*6', '27'],
      ['10/5+9', '11'],
      ['4*4+1-1', '16'],
      ['1+1-1*1/1', '1'],
    ]);

    Array.from(entries.entries()).forEach(([expression, result]) => {
      expect(calculateExpression(expression)).toEqual(result);
    });
  });
});
