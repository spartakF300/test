import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getOneUser, oneGetUserSuccess, removeUser, userEdit} from "../../store/actions/actionsUsers";
import AddUser from "../AddUser/AddUser";

const EditUser = (props) => {
    const dispatch = useDispatch();
    const editUser = useSelector(state => state.users.oneUser);
    const error = useSelector(state => state.users.error);


    useEffect(() => {
        dispatch(getOneUser(props.match.params.id));

    }, [dispatch]);

    const submitFormHandler = event => {
        event.preventDefault();
        const formData = new FormData();
        Object.keys(editUser).forEach(key => {
            formData.append(key, editUser[key])

        });
        dispatch(userEdit(props.match.params.id, formData))
    };

    const inputChangeHandler = event => {
        dispatch(oneGetUserSuccess({...editUser, [event.target.name]: event.target.value}))
    };

    const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].message;
        } catch (e) {
            return undefined;
        }
    };
    const fileChangeHandler = (e) => {
        dispatch(oneGetUserSuccess({...editUser, [e.target.name]: e.target.files[0]}))
    };
    return (
        <div>
           {editUser && <AddUser
                submitFormHandler={submitFormHandler}
                inputChangeHandler={inputChangeHandler}
                getFieldError={getFieldError}
                fileChangeHandler={fileChangeHandler}
                state={editUser}
                formName={'Edit user'}
                delete={'Delete'}
                remove={()=>dispatch(removeUser(props.match.params.id))}
            />}
        </div>
    );
};

export default EditUser;