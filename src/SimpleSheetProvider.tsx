import React, {
    createContext,
    PropsWithChildren,
    ReactNode,
    useCallback,
    useState,
} from 'react';
import { StyleSheet, View } from 'react-native';

type SheetsMap = Map<string, ReactNode>;

export type TSimpleSheetContext = {
    open: (id: string, child: ReactNode) => void;
    close: (id: string) => void;
};

export const SimpleSheetContext = createContext<TSimpleSheetContext>({
    open: () => null,
    close: () => null,
});

export const SimpleSheetProvider = (props: PropsWithChildren<{}>) => {
    const [sheets, setSheets] = useState<SheetsMap>(new Map());

    const open = useCallback((id: string, child: ReactNode) => {
        setSheets((map) => {
            const copied = new Map(map);
            copied.set(id, child);

            return copied;
        });
    }, []);

    const close = useCallback((id: string) => {
        setSheets((map) => {
            const copied = new Map(map);
            copied.delete(id);

            return copied;
        });
    }, []);

    return (
        <SimpleSheetContext.Provider value={{ open, close }}>
            {props.children}
            <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
                {Array.from(sheets.entries()).map(([id, child]) => (
                    <React.Fragment key={id}>{child}</React.Fragment>
                ))}
            </View>
        </SimpleSheetContext.Provider>
    );
};
