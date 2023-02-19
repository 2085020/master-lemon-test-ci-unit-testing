import { renderHook, act, waitFor } from '@testing-library/react';
import { Credential, User } from './model';
import { useLogin } from './login.hooks';
import * as api from './api';

describe('Use login specs', () => {
  it('test 1', () => {
    // ARRANGE

    // ACT
    const { result } = renderHook(() => useLogin());

    // ASSERT
    const defaultCredential: Credential = { name: '', password: '' };
    expect(result.current.credential).toEqual(defaultCredential);
    expect(result.current.setCredential).toEqual(expect.any(Function));
  });

  it('test 2', () => {
    // ARRANGE
    const newCredential: Credential = { name: 'admin', password: 'test' };
    // ACT
    const { result } = renderHook(() => useLogin());
    act(() => {
      result.current.setCredential(newCredential);
    });

    // ASSERT

    expect(result.current.credential).toEqual(newCredential);
    expect(result.current.setCredential).toEqual(expect.any(Function));
  });

  it('test 3', () => {
    // ARRANGE

    // ACT
    const { result } = renderHook(() => useLogin());

    // ASSERT
    const defaultCredential: Credential = { name: '', password: '' };
    expect(result.current.credential).toEqual(defaultCredential);
    expect(result.current.setCredential).toEqual(expect.any(Function));
    expect(result.current.user).toBeNull();
    expect(result.current.onLogin).toEqual(expect.any(Function));
  });

  it('test 4', async () => {
    // ARRANGE
    const newCredential: Credential = { name: 'admin', password: 'test' };
    const adminUser: User = {email: 'admin@email.com', role: 'admin'};
    //Stub
    const loginStub = jest.spyOn(api, 'login').mockResolvedValue(adminUser);

    // ACT
    const { result } = renderHook(() => useLogin());
    act(() => {
       result.current.onLogin();
    });

    // ASSERT

    expect(loginStub).toHaveBeenCalled();
    await waitFor(() => {
      expect(result.current.user).toEqual(adminUser);
    })

  });

});
