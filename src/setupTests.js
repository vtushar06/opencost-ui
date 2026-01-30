/**
 * Jest Test Setup File
 *
 * This file is run before each test file in the suite.
 * It sets up testing utilities and mocks.
 */

import '@testing-library/jest-dom';

// Mock CSS imports
jest.mock('@carbon/styles/css/styles.css', () => ({}));
jest.mock('@carbon/charts/dist/styles.css', () => ({}));

// Mock ResizeObserver (required for Carbon Charts)
global.ResizeObserver = class ResizeObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock scrollTo
window.scrollTo = jest.fn();

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Suppress console errors in tests (optional, comment out for debugging)
// const originalError = console.error;
// beforeAll(() => {
//   console.error = (...args) => {
//     if (
//       typeof args[0] === 'string' &&
//       args[0].includes('Warning: ReactDOM.render is no longer supported')
//     ) {
//       return;
//     }
//     originalError.call(console, ...args);
//   };
// });
// afterAll(() => {
//   console.error = originalError;
// });

// Custom test utilities
export const createMockAssets = (count = 5) => {
  const assets = {};
  for (let i = 0; i < count; i++) {
    assets[`cluster-1/Node/node-${i}`] = {
      type: 'Node',
      properties: {
        name: `node-${i}`,
        provider: 'GCP',
        cluster: 'cluster-1',
        category: 'Compute',
      },
      totalCost: 1000 + i * 100,
      efficiency: 0.6 + (i * 0.05),
      cpuCost: 600 + i * 50,
      ramCost: 400 + i * 50,
      breakdown: {
        user: 0.6,
        system: 0.1,
        idle: 0.3,
      },
      labels: {
        env: i % 2 === 0 ? 'production' : 'staging',
      },
    };
  }
  return assets;
};

// Render helper with common providers
export const renderWithProviders = (ui, options = {}) => {
  const { render } = require('@testing-library/react');
  const { BrowserRouter } = require('react-router');

  const Wrapper = ({ children }) => (
    <BrowserRouter>
      {children}
    </BrowserRouter>
  );

  return render(ui, { wrapper: Wrapper, ...options });
};
