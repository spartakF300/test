import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {NavLink} from "react-router-dom";
import AssignmentIcon from '@material-ui/icons/Assignment';
import CategoryIcon from '@material-ui/icons/Category';
import AddCircleIcon from '@material-ui/icons/AddCircle';
export default function SwipeableTemporaryDrawer(props) {




    return (
        <div>
            <React.Fragment>

                <SwipeableDrawer
                    anchor={'left'}
                    open={props.open}
                    onClose={() => props.close(false)}
                    onOpen={() => props.menuHandler(true)}

                >
                    <NavLink onClick={()=> props.close(false)} to="/article" style={{fontSize:'24px',textDecoration:'none',width:'160px', color:'#888'}} >
                        <List>
                            <ListItem button >
                                <AssignmentIcon/>
                                <ListItemText primary="Article"/>
                            </ListItem>
                        </List>
                    </NavLink>
                    <NavLink onClick={()=> props.close(false)} to="/userAdd" style={{fontSize:'24px',textDecoration:'none',width:'160px', color:'#888'}} >
                        <List>
                            <ListItem button >
                                <AddCircleIcon/>
                                <ListItemText primary="Create user"/>
                            </ListItem>
                        </List>
                    </NavLink>
                    <NavLink onClick={()=> props.close(false)} to="/addArticle" style={{fontSize:'24px',textDecoration:'none',width:'160px', color:'#888'}} >
                        <List>
                            <ListItem button >
                                <AddCircleIcon/>
                                <ListItemText primary="Create article"/>
                            </ListItem>
                        </List>
                    </NavLink>
                    <NavLink onClick={()=> props.close(false)} to="/addCategory" style={{fontSize:'24px',textDecoration:'none',width:'160px', color:'#888'}} >
                        <List>
                            <ListItem button >
                                <AddCircleIcon/>
                                <ListItemText primary="Add category"/>
                            </ListItem>
                        </List>
                    </NavLink>
                    <NavLink onClick={()=> props.close(false)} to="/category" style={{fontSize:'24px',textDecoration:'none',width:'160px', color:'#888'}} >
                        <List>
                            <ListItem button >
                                <CategoryIcon/>
                                <ListItemText primary="Category"/>
                            </ListItem>
                        </List>
                    </NavLink>
                    <NavLink onClick={()=> props.close(false)} to="/userList" style={{fontSize:'24px',textDecoration:'none',width:'160px', color:'#888'}} >
                        <List>
                            <ListItem button >
                                <AssignmentIcon/>
                                <ListItemText primary="Users"/>
                            </ListItem>
                        </List>
                    </NavLink>
                </SwipeableDrawer>
            </React.Fragment>

        </div>
    );
}