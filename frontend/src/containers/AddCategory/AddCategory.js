import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createCategory, getCategory} from "../../store/actions/actionsCategory";
import CategoryForm from "../../components/UI/Form/categoryForm";

const AddCategory = () => {
    const dispatch = useDispatch();
    let category = useSelector((state)=> state.category.category);

    useEffect(()=>{
        dispatch(getCategory())
    },[]);


    const [state, setState] = useState({
        title: '',
        parent_id: ''
    });

    const submitFormHandler = event => {
        event.preventDefault();
        dispatch(createCategory({...state}))

    };
    const inputChangeHandler = event => {

        setState({...state,
            [event.target.name]: event.target.value
        })
    };
    category = category.filter(c=>c.title !=='All');
    return (

       <CategoryForm
           submitFormHandler={submitFormHandler}
           inputChangeHandler={inputChangeHandler}
           state={state}
           name={'Create category'}
           category={category}
       />
    );
};

export default AddCategory;