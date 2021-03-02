import React, {useEffect, useContext} from 'react';
import {Header} from '../../components';
import axios from 'axios'
import {AppContext} from '../../context/appContext';
import {GET_ALLMOVIES_API_REQUESTED, GET_ALLMOVIES_API_SUCCESSED, GET_ALLMOVIES_API_FAILED} from './constants';
import { makeStyles } from '@material-ui/core/styles';
import {Container, Grid, Card, CardActionArea, CardContent, CardMedia, Typography} from '@material-ui/core';
import { Link, BrowserRouter as Router, Route } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});
const ListingPage = () => {
    const classes = useStyles();
    const {listingState, listingDispatch} = useContext(AppContext)
    const {filteredData} = listingState;
    console.log(filteredData)
    useEffect(() => {
        listingDispatch({type:GET_ALLMOVIES_API_REQUESTED});
        axios.get('http://www.omdbapi.com/?s=inception&apikey=a822df56')
        .then(function (response) {
            listingDispatch({type:GET_ALLMOVIES_API_SUCCESSED, payload:response.data.Search})
        })
        .catch(function (error) {
            listingDispatch({type:GET_ALLMOVIES_API_FAILED});
        });
    },[]);

    return(
        <div>
            <Header/>
            <Container>
                <Grid container spacing={3}>
                    {
                        filteredData && filteredData.map((item, index) => {
                            return(
                                item.Poster !== "N/A" && 
                                    <Grid item xs={3} key={index}>
                                        <Link to={`/details/${item.imdbID}`}>
                                        <Card className={classes.root}>
                                            <CardActionArea>
                                                <CardMedia
                                                    className={classes.media}
                                                    image={item.Poster}
                                                    title={item.Title}
                                                />
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="h2" className="movie-name" title={item.Title}>
                                                        {item.Title}  
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary" component="p">
                                                        {item.Year} 
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                        </Link>
                                    </Grid>
                                
                            )
                        })
                    }
                   
                   
                </Grid>
            </Container>
        </div>
    )
};

export default ListingPage;