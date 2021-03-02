import {GET_ALLMOVIES_API_REQUESTED, GET_ALLMOVIES_API_SUCCESSED, GET_ALLMOVIES_API_FAILED, GET_FILTERED_DATA} from './constants';

const reducerHelper = (state, loading, moviesData, error, filteredData) => {
    return {
        ...state,
        loading:loading,
        moviesData:moviesData,
        error:error,
        filteredData:filteredData
    }
};

const listingPageReducer = (state, action) => {
    switch(action.type){
        case GET_ALLMOVIES_API_REQUESTED :
            const requested = reducerHelper(state, true, null, false, null);
            return{
                ...state,
                ...requested
            }
        case GET_ALLMOVIES_API_SUCCESSED :
            const successed = reducerHelper(state, false, action.payload, false, action.payload);
            return{
                ...state,
                ...successed
            }
        case GET_ALLMOVIES_API_FAILED :
            const failed = reducerHelper(state, false, null, true, null);
            return{
                ...state,
                failed
            }
        case GET_FILTERED_DATA :
            const filteredData = action.payload !== "" ?  state.moviesData.filter(function(itm){
                return itm.Title === action.payload ? itm : null;
              }) : state.moviesData;
        
            return{
                ...state,
                filteredData
            }
        default:
            return state
    }
}

export default listingPageReducer;