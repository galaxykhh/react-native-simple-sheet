import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { SimpleSheetContext } from './SimpleSheetProvider';
import {
    SimpleSheetHandler,
    type SheetCreator,
    type SimpleSheetHandlerRef,
} from './SimpleSheetHandler';

let _id = 1;

export const useSimpleSheet = () => {
    const context = useContext(SimpleSheetContext);

    if (!context) {
        throw new Error('App must be wrapped in a <SimpleSheetProvider />');
    }

    const [id] = useState(() => String(_id++));
    const simpleSheetRef = useRef<SimpleSheetHandlerRef>(null);
    const { open, close } = context;

    useEffect(() => {
        return () => {
            close(id);
        };
    }, [id, close]);

    return useMemo(
        () => ({
            open: async (sheet: SheetCreator) => {
                open(
                    id,
                    <SimpleSheetHandler
                        key={Date.now()}
                        ref={simpleSheetRef}
                        sheet={sheet}
                        onUnmount={() => close(id)}
                    />
                );
            },
            close: (additionalAction?: () => void) => {
                simpleSheetRef.current?.close(additionalAction);
            },
            exit: () => {
                close(id);
            },
        }),
        [id, open, close]
    );
};
