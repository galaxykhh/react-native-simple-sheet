import React, { useCallback, useRef } from 'react';
import type { SheetHandler } from '../components/SimpleSheet';

type UseSimpleSheetHook = [
    React.RefObject<SheetHandler>,
    () => void,
    () => void
];

export const useSimpleSheet = (): UseSimpleSheetHook => {
    const ref = useRef<SheetHandler>(null);

    const show = useCallback((): void => {
        ref.current?.show();
    }, []);

    const hide = useCallback((): void => {
        ref.current?.hide();
    }, []);

    return [ref, show, hide] as const;
};
