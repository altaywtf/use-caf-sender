import '@testing-library/jest-dom';
import './__mocks__/matchMedia';
import './__mocks__/chrome';
import './__mocks__/cast';

jest.spyOn(console, 'warn').mockImplementation(() => null);
