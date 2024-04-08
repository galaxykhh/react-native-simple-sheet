import React, { useCallback, useRef } from 'react';
import type { SheetHandler } from '../components';

type UseSimpleSheetHook = readonly [
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
