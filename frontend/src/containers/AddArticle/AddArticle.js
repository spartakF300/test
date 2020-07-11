import React, {useEffect, useState} from 'react';
import FormArticle from "../../components/UI/Form/FormArticle";
import {useDispatch, useSelector} from "react-redux";
import {getCategory} from "../../store/actions/actionsCategory";
import {createArticle} from "../../store/actions/actionsArticle";

const AddArticle = () => {


    const dispatch = useDispatch();
    const category = useSelector((state)=> state.category.category);

    useEffect(()=>{
        dispatch(getCategory())
    },[]);

    const [state,setState]= useState({
        title:'',
        description:'',
        category:'',
        image:null
    });

    const inputChangeHandler = event => {
     setState({...state,
            [event.target.name]: event.target.value
        })
    };
  const  submitFormHandler = event => {
        event.preventDefault();
        const formData = new FormData();
        Object.keys(state).forEach(key=>{
            formData.append(key,state[key])
        });
        dispatch(createArticle(formData))
    };
  const  fileChangeHandler = (e)=>{

      setState({...state,
            [e.target.name]: e.target.files[0]
        })
    };

    return (
        <div>
            <FormArticle
                inputChangeHandler={inputChangeHandler}
                submitFormHandler={submitFormHandler}
                fileChangeHandler={fileChangeHandler}
                value={state}
                name={'Create article'}
                options={category}
            />
        </div>
    );
};

export default AddArticle;