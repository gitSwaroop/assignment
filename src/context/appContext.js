import React, { createContext, useReducer } from 'react';
import { listingPageReducer, detailsPageReducer } from './reducers';
import { getAllMoviesInitialState, getMoviesDetailsInitialState } from '../initialStates';

export const AppContext = createContext();

const AppState = (props) => {
    const [listingState, listingDispatch] = useReducer(listingPageReducer, getAllMoviesInitialState);
    const [detailsState, detailsDispatch] = useReducer(detailsPageReducer, getMoviesDetailsInitialState);
    return(
        <AppContext.Provider value={{
            listingState,
            listingDispatch,
            detailsState, 
            detailsDispatch
        }}>
            {props.children}
        </AppContext.Provider>
    )
    
}

export default AppState

