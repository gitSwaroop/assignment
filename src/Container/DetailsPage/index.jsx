import React, {useEffect, useContext} from 'react';
import axios from 'axios'
import {Header} from '../../components';
import { useParams } from "react-router-dom";
import {AppContext} from '../../context/appContext';
import {Container, Grid, Card, CardActionArea, CardContent, CardMedia, Typography} from '@material-ui/core';
import {GET_MOVIES_DETAILS_API_REQUESTED, GET_MOVIES_DETAILS_API_SUCCESSED, GET_MOVIES_DETAILS_API_FAILED} from './constants'
const DetailsPage = () => {
    const {detailsState, detailsDispatch} = useContext(AppContext)
    const {movieData} = detailsState;
    const {id} = useParams();
    const url = "http://www.omdbapi.com/?i="+id+"&plot=full&apikey=a822df56";
    //console.log(movieData)
    useEffect(() => {
        detailsDispatch({type:GET_MOVIES_DETAILS_API_REQUESTED});
        axios.get(url)
        .then(function (response) {
            console.log(response)
            detailsDispatch({type:GET_MOVIES_DETAILS_API_SUCCESSED, payload:response.data})
        })
        .catch(function (error) {
            detailsDispatch({type:GET_MOVIES_DETAILS_API_FAILED});
        });
    },[]);
    return(
        <div>
            <Header/>
            <Container>
            {movieData &&<Grid container spacing={3}>
                    
                        <Grid item xs={4} className="details-img-wrp">
                            <img src={movieData.Poster}/>
                        </Grid>
                        <Grid item xs={8}>
                            <h1 className="title">{movieData.Title}</h1>
                            <div className="actors"><span className="keyname">Cast : </span>{movieData.Actors}</div>
                            <div className="actors"><span className="keyname">About : </span>{movieData.Plot}</div>
                            <div className="actors"><span className="keyname">Director : </span>{movieData.Director}</div>
                            <div className="actors"><span className="keyname">Language : </span>{movieData.Language}</div>
                            <div className="actors"><span className="keyname">Country : </span>{movieData.Country}</div>
                            <div className="actors"><span className="keyname">Year : </span>{movieData.Year}</div>
                            <div className="actors"><span className="keyname">Rating : </span>{movieData.imdbRating}</div>
                        </Grid>
   
                                     
                </Grid>}
            </Container>
        </div>
        
    )
}

export default DetailsPage