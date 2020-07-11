import React, {useEffect, useState} from 'react';
import Card from '../../components/Card/Card';
import Grid from "@material-ui/core/Grid";
import FormElement from "../../components/UI/Form/FormElement";
import {useDispatch, useSelector} from "react-redux";
import {getCategory} from "../../store/actions/actionsCategory";
import {getArticle} from "../../store/actions/actionsArticle";
import Typography from "@material-ui/core/Typography";

const Article = (props) => {
    const dispatch = useDispatch();
    const category = useSelector((state) => state.category.category);
    const article = useSelector((state) => state.article.article);
    const [state, setState] = useState({
        category: ''
    });
    useEffect(() => {
        dispatch(getCategory());
        dispatch(getArticle(state.category))
    }, [state]);

    const inputChangeHandler = e => {
        setState({[e.target.name]: e.target.value})
    };

    return (
        <Grid spacing={2}  container item style={{marginTop: '5%', margin: "auto"}}>
            <Typography gutterBottom variant="h5" component="h2">
                Article
            </Typography>
            <Grid item style={{width: '300px', marginTop: '2%'}}>

                <FormElement
                    style={{background: '#e4f0ef', borderRadius: '5px'}}
                    propertyName="category"
                    title="Category"
                    type="select"
                    value={state.category}
                    onChange={inputChangeHandler}
                    placeholder="Category"
                    options={category }
                />
            </Grid>
            <Grid spacing={2} container direction="column" item justify="center" xs={8}>

                {article.map(a => (
                    <Grid key={a._id} item>
                        <Card
                            image={a.image}
                            title={a.title}
                            description={a.description}
                            author={a.user.displayName}
                            category={a.category.title}
                            id={a._id}
                        />
                    </Grid>
                ))}

            </Grid>
        </Grid>
    );
};

export default Article;