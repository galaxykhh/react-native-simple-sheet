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

    useEffect(() => {
        return () => {
            context.close(id);
        };
    }, [id, context.close]);

    return useMemo(
        () => ({
            open: async (sheet: SheetCreator) => {
                context.open(
                    id,
                    <SimpleSheetHandler
                        key={Date.now()}
                        ref={simpleSheetRef}
                        sheet={sheet}
                        onUnmount={() => context.close(id)}
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
