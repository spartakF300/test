import {
    CATEGORY_FAILURE,
    CATEGORY_REQUEST,
    CATEGORY_SUCCESS,
    GET_CATEGORY_SUCCESS,
    GET_ONE_CATEGORY_SUCCESS
} from "../actions/actionsCategory";

const initialState = {
    category: [],
    error: null,
    loading: false,
    oneCategory: []
};
const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case CATEGORY_REQUEST :
            return {...state, loading: true};
        case CATEGORY_SUCCESS:
            return {...state, loading: false};
        case CATEGORY_FAILURE :
            return {...state, loading: false, error: action.error};
        case GET_CATEGORY_SUCCESS:
            return {...state, loading: false, category: action.data};
        case GET_ONE_CATEGORY_SUCCESS:
            return {...state, loading: false, oneCategory: action.data};
        default:
            return state

    }
};
export default categoryReducer;