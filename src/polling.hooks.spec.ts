import { renderHook, waitFor } from '@testing-library/react';
import { usePolling } from './polling.hooks';

describe('use polling specs', () => {

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('test init', () => {
    // ARRANGE
    const pollingTime = 500;
    // ACT
    const { result } = renderHook(() => usePolling(pollingTime));

    // ASSERT
    expect(result.current.count).toEqual(0);
  });

  it('test wait for', async () => {
    // ARRANGE
    const pollingTime = 500;
    // ACT
    const { result } = renderHook(() => usePolling(pollingTime));

    // ASSERT
    await waitFor(() => {
      expect(result.current.count).toEqual(1);
    });
  });

  it('test wait for 3', async () => {
    // ARRANGE
    const pollingTime = 500;
    // ACT
    const { result } = renderHook(() => usePolling(pollingTime));

    // ASSERT
    await waitFor(
      () => {
        expect(result.current.count).toEqual(3);
      },
      { timeout: 2000 }
    );
  });

  it('test wait for clearInterval', () => {
    // ARRANGE
    const pollingTime = 500;
    // ACT
    const { unmount } = renderHook(() => usePolling(pollingTime));
    //STUB on window object
    const stub = jest.spyOn(window, 'clearInterval');

    // ASSERT
    expect(stub).not.toHaveBeenCalled();
    unmount();
    expect(stub).toHaveBeenCalled();
  });
});
