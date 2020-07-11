import React, {useEffect} from 'react';
import FormArticle from "../../components/UI/Form/FormArticle";
import {useDispatch, useSelector} from "react-redux";
import {articleEdit, getOneArticle, getOneArticleSuccess, removeArticle} from "../../store/actions/actionsArticle";
import {getCategory} from "../../store/actions/actionsCategory";

const EditArticle = (props) => {
    const dispatch = useDispatch();
    const editArticle = useSelector((state) => state.article.oneArticle);
    let category = useSelector((state) => state.category.category);

    useEffect(() => {
        dispatch(getOneArticle(props.match.params.id))
        dispatch(getCategory())
    }, [dispatch]);

    const inputChangeHandler = event => {
        dispatch(getOneArticleSuccess({...editArticle, [event.target.name]: event.target.value}))

    };
    const submitFormHandler = event => {
        event.preventDefault();
        const formData = new FormData();
        Object.keys(editArticle).forEach(key => {
            formData.append(key, editArticle[key])
        });
        dispatch(articleEdit(props.match.params.id,formData))
    };

    const fileChangeHandler = (e) => {

        dispatch(getOneArticleSuccess({...editArticle, [e.target.name]: e.target.files[0]}))
    };
    category = category.filter(c=>c.title !=='All');
    return (
        <div>
           {editArticle && <FormArticle
                inputChangeHandler={inputChangeHandler}
                submitFormHandler={submitFormHandler}
                fileChangeHandler={fileChangeHandler}
                value={editArticle}
                name={'Edit article'}
                options={category}
                delete={'Delete'}
                remove={()=>dispatch(removeArticle(props.match.params.id))}

            />}
        </div>
    );
};

export default EditArticle;