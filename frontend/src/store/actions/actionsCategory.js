import axiosApi from "../../axiosApi";
import {push} from 'connected-react-router';
import {toast} from "react-toastify";
import {articleFailure, articleRequest, articleSuccess} from "./actionsArticle";


export const CATEGORY_REQUEST = 'CATEGORY_REQUEST';
export const CATEGORY_SUCCESS = 'CATEGORY_SUCCESS';
export const CATEGORY_FAILURE = 'CATEGORY_FAILURE';

export const GET_CATEGORY_SUCCESS = 'GET_CATEGORY_SUCCESS';

export const GET_ONE_CATEGORY_SUCCESS = 'GET_ONE_CATEGORY_SUCCESS';

export const categoryRequest = ()=>({type:CATEGORY_REQUEST});
export const categorySuccess = data=>({type:CATEGORY_SUCCESS,data});
export const categoryFailure = error=>({type:CATEGORY_FAILURE,error});

export const getCategorySuccess =data=>({type:GET_CATEGORY_SUCCESS,data});

export const getOneCategorySuccess =data=>({type:GET_ONE_CATEGORY_SUCCESS,data});

export const createCategory = data=>{
  return async dispatch =>{
      try{
          dispatch(categoryRequest());
          await axiosApi.post('/category',data);
          dispatch(categorySuccess());
          dispatch(push('/category'))
      }catch (e) {
          dispatch(categoryFailure(e))
      }

  }
};

export const getCategory = () =>{
    return async dispatch =>{
        try{
            dispatch(categoryRequest());
        const response =  await axiosApi.get('/category');
            dispatch(getCategorySuccess(response.data));
        }catch (e) {
            dispatch(categoryFailure(e))
        }

    }
};

export const getOneCategory = (id)=>{

    return async dispatch=>{
        try {
            dispatch(categoryRequest());
            const response = await axiosApi.get('/category/'+id);
            dispatch(getOneCategorySuccess(response.data))

        }catch (e) {
            dispatch(categoryFailure(e))
        }

    }
};
export const categoryEdit = (id,data)=>{

    return async dispatch=>{
        try {
            dispatch(categoryRequest());
             await axiosApi.put('/category/'+id,data);
            dispatch(categorySuccess())
            dispatch(push('/category'));
        }catch (e) {
            dispatch(categoryFailure(e))
        }

    }
};

export const removeCategory =(id)=>{
    return async dispatch=>{
        try{
            dispatch(categoryRequest());
            await axiosApi.delete('/category/'+id);
            dispatch(categorySuccess());
            toast.success('Удалено');
            dispatch(push('/category'));
        }catch (e) {
            dispatch(categoryFailure(e))
        }

    }
};