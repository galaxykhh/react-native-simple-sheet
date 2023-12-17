import { useCallback, useRef } from 'react';
import type { SheetHandler } from '../components';

type UseSimpleSheetType = {
    ref: React.RefObject<SheetHandler>;
    show: () => void;
    hide: () => void;
};

export const useSimpleSheet = (): UseSimpleSheetType => {
    const ref = useRef<SheetHandler>(null);

    const show = useCallback((): void => {
        ref.current?.show();
    }, []);

    const hide = useCallback((): void => {
        ref.current?.hide();
    }, []);

    return { ref, show, hide };
};
