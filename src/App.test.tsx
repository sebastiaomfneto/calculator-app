import { render } from '@testing-library/react';

import App from './App';

test('should render without crashes', () => {
  const { baseElement } = render(<App />);
  expect(baseElement).toBeDefined();
});
