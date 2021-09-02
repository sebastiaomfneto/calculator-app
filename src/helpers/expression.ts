export type Entry = string | string[] | Entry[];

const OPERATORS_PATTERN = /([/*\-+])/;
const PRIORITY_OPERATORS_PATTERN = /[/*]/;
const NUMBERS_PATTERN = /\d+/;
const INVALID_EXPRESSION_PATTERN = /[^\d+\-*/]|^[^\d]|[^\d]$/;

export const recursiveRemoveUndefinedEntries = (entries: Entry[]): Entry[] => {
  return entries.reduce<Entry[]>((aggregator, entry) => {
    if (Array.isArray(entry)) {
      aggregator.push(recursiveRemoveUndefinedEntries(entry));
    } else if (entry !== undefined) {
      aggregator.push(entry);
    }

    return aggregator;
  }, []);
};

export const getOrdenedEntriesByPrecedence = (expression: string): Entry[] => {
  const entries = expression.split(OPERATORS_PATTERN);

  const result: Entry = [];

  for (let index = 0; index < entries.length; index++) {
    const entry = entries[index];

    if (entry.match(PRIORITY_OPERATORS_PATTERN)) {
      const [previousEntry] = result.splice(index - 1, 1);
      const [nextEntry] = entries.splice(index + 1, 1);

      result[index] = [previousEntry, entry, nextEntry];
    } else {
      result[index] = entry;
    }
  }

  return recursiveRemoveUndefinedEntries(result);
};

export const recursiveCalculateEntries = (entries: Entry[]): string => {
  for (let index = 0; index < entries.length; index++) {
    const entry = entries[index];

    if (Array.isArray(entry)) {
      entries[index] = recursiveCalculateEntries(entry);
    }
  }

  const numbers = (entries as string[]).filter((entry) =>
    NUMBERS_PATTERN.test(entry)
  );
  const operators = (entries as string[]).filter((entry) =>
    OPERATORS_PATTERN.test(entry)
  );

  let indexNumber = 0;
  let indexOperator = -1;

  let result = 0;
  do {
    const number = parseInt(numbers[indexNumber]);
    const operator = operators[indexOperator];

    switch (operator) {
      case '+':
        result += number;
        break;
      case '-':
        result -= number;
        break;
      case '*':
        result *= number;
        break;
      case '/':
        if (number === 0) {
          throw new Error('Zero division Error');
        }
        result /= number;
        break;
      default:
        result = number;
    }

    indexNumber++;
    indexOperator++;
  } while (indexNumber < numbers.length);

  return result.toString();
};

export const validateExpression = (expression: string): void => {
  if (INVALID_EXPRESSION_PATTERN.test(expression)) {
    throw new Error('Invalid expression');
  }
};

export const calculateExpression = (expression: string): string => {
  validateExpression(expression);

  const entries: Entry[] = getOrdenedEntriesByPrecedence(expression);

  return recursiveCalculateEntries(entries);
};
