import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {apiURL} from "../../constants";
import CardHeader from "@material-ui/core/CardHeader";
import {Link} from "react-router-dom";

const useStyles = makeStyles({
    root: {
        maxWidth: '100%',
    },
    media: {
        height: 140,
    },
});

export default function MediaCard(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardHeader

                    title={`Author:   ${props.author}`}
                    subheader={`category: ${props.category}`}
                />
               {props.image && <CardMedia
                    className={classes.media}
                    image={apiURL+ '/' + props.image}
                    title={props.title}
                />}
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.title}
                    </Typography>

                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button component={Link} to={'/editArticle/'+ props.id} size="small" color="primary">
                    Edit
                </Button>
                <Button size="small" color="primary">
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
}