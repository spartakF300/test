import axiosApi from "../../axiosApi";
import { toast } from 'react-toastify';
import {push} from "connected-react-router";
export const ARTICLE_REQUEST = 'ARTICLE_REQUEST';
export const ARTICLE_SUCCESS = 'ARTICLE_SUCCESS';
export const ARTICLE_FAILURE = 'ARTICLE_FAILURE';
export const GET_ARTICLE_SUCCESS = 'GET_ARTICLE_SUCCESS';

export const GET_ONE_ARTICLE_SUCCESS ='GET_ONE_ARTICLE_SUCCESS';

export const articleRequest =()=>({type:ARTICLE_REQUEST});
export const articleSuccess =()=>({type:ARTICLE_SUCCESS});
export const articleFailure =error=>({type:ARTICLE_FAILURE,error});

export const getArticleSuccess =data=>({type:GET_ARTICLE_SUCCESS,data});

export const getOneArticleSuccess = data=>({type:GET_ONE_ARTICLE_SUCCESS,data});


export const createArticle = data=>{

  return async dispatch=>{
      try {
          dispatch(articleRequest());
          await axiosApi.post('/article',data);
          dispatch(articleSuccess())

      }catch (e) {
          dispatch(articleFailure(e))
      }

  }
};
export const getArticle = (id)=>{
    let url= '/article';
if (id && id !== 'all'){
    url+='?id=' + id
}
    return async dispatch=>{
        try {
            dispatch(articleRequest());
        const response = await axiosApi.get(url);
            dispatch(getArticleSuccess(response.data))

        }catch (e) {
            dispatch(articleFailure(e))
        }

    }
};
export const getOneArticle = (id)=>{

    return async dispatch=>{
        try {
            dispatch(articleRequest());
            const response = await axiosApi.get('/article/'+id);
            dispatch(getOneArticleSuccess(response.data))

        }catch (e) {
            dispatch(articleFailure(e))
        }

    }
};
export const articleEdit =(id,data)=>{
  return async dispatch=>{
      try{
          dispatch(articleRequest());
          await axiosApi.put('/article/'+id,data);
          dispatch(articleSuccess())
          toast.success('Отредактировано');
          dispatch(push('/article'));
      }catch (e) {
          dispatch(articleFailure(e))
      }

  }
};
export const removeArticle =(id)=>{
    return async dispatch=>{
        try{
            dispatch(articleRequest());
            await axiosApi.delete('/article/'+id);
            dispatch(articleSuccess());
            toast.success('Удалено');
            dispatch(push('/article'));
        }catch (e) {
            dispatch(articleFailure(e))
        }

    }
};