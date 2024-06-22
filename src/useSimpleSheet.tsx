import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { SimpleSheetContext } from './SimpleSheetProvider';
import {
    SimpleSheetHandler,
    type SheetCreator,
    type SimpleSheetHandlerRef,
} from './SimpleSheetHandler';

let elementId = 1;

interface Options {
    exitOnClose?: boolean;
}

export const useSimpleSheet = ({ exitOnClose = true }: Options = {}) => {
    const context = useContext(SimpleSheetContext);

    if (!context) {
        throw new Error('App must be wrapped in a <SimpleSheetProvider />');
    }

    const [id] = useState(() => String(elementId++));
    const simpleSheetRef = useRef<SimpleSheetHandlerRef>(null);

    useEffect(() => {
        return () => {
            if (exitOnClose) {
                context.close(id);
            }
        };
    }, [exitOnClose, id, context.close]);

    return useMemo(
        () => ({
            open: async (sheet: SheetCreator) => {
                context.open(
                    id,
                    <SimpleSheetHandler
                        key={Date.now()}
                        ref={simpleSheetRef}
                        sheet={sheet}
                        onExit={() => context.close(id)}
                    />
                );
            },
            close: (additionalAction?: () => void) => {
                simpleSheetRef.current?.close(additionalAction);
            },
            exit: () => {
                context.close(id);
            },
        }),
        [id, context.open, context.close]
    );
};
