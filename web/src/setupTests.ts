import 'raf/polyfill';

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};

(global as any).localStorage = localStorageMock;
