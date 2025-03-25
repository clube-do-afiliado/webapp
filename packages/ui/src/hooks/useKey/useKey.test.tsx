import React from 'react';

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import useKey from './useKey';

// Test component that uses the hook
function TestComponent({ data }) {
  useKey(data);
  return (
    <div>Test</div>
  );
}

describe('useKey', () => {
  it('calls the correct function when a key is pressed', async () => {
    const mockFn = jest.fn();
    const data = { a: mockFn };
    render(<TestComponent data={data} />);
    await userEvent.keyboard('a');
    expect(mockFn).toHaveBeenCalled();
  });

  it('does not call the function when a different key is pressed', async () => {
    const mockFn = jest.fn();
    const data = { a: mockFn };
    render(<TestComponent data={data} />);
    await userEvent.keyboard('[b]');
    expect(mockFn).not.toHaveBeenCalled();
  });

  it('removes the event listener when the component is unmounted', async () => {
    const mockFn = jest.fn();
    const data = { a: mockFn };
    const { unmount } = render(<TestComponent data={data} />);
    unmount();
    await userEvent.keyboard('[a]');
    expect(mockFn).not.toHaveBeenCalled();
  });
});
