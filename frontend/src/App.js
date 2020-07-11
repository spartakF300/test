import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import AppToolbar from "./components/UI/Toolbar/Toolbar";
import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";
import Main from "./containers/Main/Main";
import {ToastContainer} from 'react-toastify';
import Container from "@material-ui/core/Container";
import './App.css';
import AddCategory from "./containers/AddCategory/AddCategory";
import AddArticle from "./containers/AddArticle/AddArticle";
import UserAdd from "./components/UI/Form/UserAdd";
import Article from "./containers/Article/Article";
import Category from "./containers/Category/Category";
import EditArticle from "./containers/EditArticle/EditArticle";
import EditCategory from "./containers/EditCategory/EditCategory";
import UserList from "./containers/UserList/UserList";
import EditUser from "./containers/EditUser/EditUser";
import {useSelector} from "react-redux";

const ProtectedRoute = ({isAllowed, ...props}) => (
    isAllowed ? <Route {...props}/> : <Redirect to="/login"/>
);

function App() {
    const user = useSelector(state => state.users.user);
    return (
        <div className="fonts">
            <AppToolbar/>
            <Container>
                <Switch>
                    <ProtectedRoute isAllowed={user} path="/" exact component={Article}/>
                    <Route path="/login" exact component={Login}/>
                    <Route path="/register" exact component={Register}/>
                    <ProtectedRoute isAllowed={user} path="/addCategory" exact component={AddCategory}/>
                    <ProtectedRoute isAllowed={user} path="/addArticle" exact component={AddArticle}/>
                    <ProtectedRoute isAllowed={user} path="/userAdd" exact component={UserAdd}/>
                    <ProtectedRoute isAllowed={user} path="/article" exact component={Article}/>
                    <ProtectedRoute isAllowed={user}path="/category" exact component={Category}/>
                    <ProtectedRoute isAllowed={user}path="/editArticle/:id" exact component={EditArticle}/>
                    <ProtectedRoute isAllowed={user} path="/editCategory/:id" exact component={EditCategory}/>
                    <ProtectedRoute isAllowed={user} path="/userList" exact component={UserList}/>
                    <ProtectedRoute isAllowed={user && user.role === 'admin'} path="/editUser/:id" exact component={EditUser}/>
                </Switch>
            </Container>
            <ToastContainer/>
        </div>
    );
}


export default App;

