import { createContext } from "react";
import { createBrowserHistory } from 'history';

export const HistoryContext = createContext();

export const HistoryProvider = ({ children }) => {
    const history = createBrowserHistory()
    return (
        <HistoryContext.Provider value={history}>
            {children}
        </HistoryContext.Provider>
    );
};