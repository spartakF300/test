import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getCategory} from "../../store/actions/actionsCategory";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
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
const Category = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    let category = useSelector(state => state.category.category);

    useEffect(() => {
        dispatch(getCategory());
    }, []);

    category = category.filter(c=>c.title !=='All');
    return (

        <Grid direction="column" alignItems="center" container item spacing={4}>

            {category.map(c => {

                return (<Grid key={c._id} item>
                        <Card className={classes.root}>
                            <CardContent>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    {c.title}
                                </Typography>

                            </CardContent>
                            <CardActions>
                                <Button component={Link} to={'/editCategory/' + c._id} size="small">Edit</Button>
                            </CardActions>
                        </Card>
                    </Grid>)

            })}

        </Grid>
    );
};

export default Category;