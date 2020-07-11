import {
    ARTICLE_FAILURE,
    ARTICLE_REQUEST,
    ARTICLE_SUCCESS,
    GET_ARTICLE_SUCCESS,
    GET_ONE_ARTICLE_SUCCESS
} from "../actions/actionsArticle";


const initialState = {
    article:[],
    error:null,
    loading:false,
    oneArticle:[]
};
const articleReducer =(state=initialState,action)=>{
    switch (action.type) {
        case ARTICLE_REQUEST :
            return {...state,loading: true};
        case ARTICLE_SUCCESS:
            return {...state,loading: false};
        case ARTICLE_FAILURE :
            return {...state,loading: false,error: action.error};
        case GET_ARTICLE_SUCCESS:
            return {...state,loading: false,article: action.data};
        case GET_ONE_ARTICLE_SUCCESS:
            return {...state,loading: false,oneArticle:action.data};
        default: return state

    }
};
export default articleReducer;