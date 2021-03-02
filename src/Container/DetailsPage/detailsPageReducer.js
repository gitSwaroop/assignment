import {GET_MOVIES_DETAILS_API_REQUESTED, GET_MOVIES_DETAILS_API_SUCCESSED, GET_MOVIES_DETAILS_API_FAILED} from './constants'

const reducerHelper = (state, loading, movieData, error) => {
    return {
        ...state,
        loading:loading,
        movieData:movieData,
        error:error
    }
};

const detailsPageReducer = (state, action) => {
    switch(action.type){
        case GET_MOVIES_DETAILS_API_REQUESTED :
            const requested = reducerHelper(state, true, null, false);
            return{
                ...state,
                ...requested
            }
        case GET_MOVIES_DETAILS_API_SUCCESSED :
            const successed = reducerHelper(state, false, action.payload, false);
            return{
                ...state,
                ...successed
            }
        case GET_MOVIES_DETAILS_API_FAILED :
            const failed = reducerHelper(state, false, null, true);
            return{
                ...state,
                failed
            }
        default:
            return state
    }
}

export default detailsPageReducer;