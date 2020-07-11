import React, {useEffect} from 'react';
import CategoryForm from "../../components/UI/Form/categoryForm";

import {useDispatch, useSelector} from "react-redux";
import {
    categoryEdit,
    getCategory,
    getOneCategory,
    getOneCategorySuccess,
    removeCategory
} from "../../store/actions/actionsCategory";

const EditCategory = (props) => {
    const dispatch = useDispatch();
    const editCategory = useSelector(state => state.category.oneCategory);
    let category = useSelector((state) => state.category.category);

    useEffect(()=>{
       dispatch(getOneCategory(props.match.params.id));
        dispatch(getCategory());
    },[dispatch]);

    const submitFormHandler = event => {
        event.preventDefault();
      dispatch(categoryEdit(props.match.params.id,editCategory))

    };
    const inputChangeHandler = event => {
        dispatch(getOneCategorySuccess({...editCategory,[event.target.name]:event.target.value}))
    };
category = category.filter(c=>c.title !=='All');
    return (
        <CategoryForm
            submitFormHandler={submitFormHandler}
            inputChangeHandler={inputChangeHandler}
            category={category}
            state={editCategory}
            name={'Edit category'}
            delete={"Delete"}
            remove={()=>dispatch(removeCategory(props.match.params.id))}
        />
    );
};

export default EditCategory;