import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {getUsers} from "../../store/actions/actionsUsers";
import Avatar from "../../components/Avatar/Avatar"
const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});
const UserList = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const users = useSelector(state => state.users.users);

    useEffect(()=>{
        dispatch(getUsers())
    },[]);

    return (
        <Grid style={{marginTop:"4%"}} direction="column" alignItems="center" container item spacing={4}>

            {users && users.map(u => {

                return (<Grid key={u._id} item>
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                {u.username}
                            </Typography>
                            <Avatar
                            avatar={u.avatar}
                            />
                        </CardContent>
                        <CardActions>
                            <Button component={Link} to={'/editUser/' + u._id} size="small">Edit</Button>
                        </CardActions>
                    </Card>
                </Grid>)

            })}

        </Grid>
    );
};

export default UserList;