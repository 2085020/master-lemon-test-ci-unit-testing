import { renderHook, act } from '@testing-library/react';
import { useLanguage } from './language.hooks';
import { LanguageProvider } from './language.context';

describe('useLanguage specs', () => {
    it('test change to en', () => {
        // ARRANGE

        // ACT
        const {result} = renderHook(() => useLanguage(), {
          wrapper:LanguageProvider
        });
        act(() => {
          result.current.setLanguage('en');
        });
        // ASSERT
        expect(result.current.message).toEqual('The current language is: en')

    })
});
