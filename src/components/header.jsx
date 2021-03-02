import React,{useContext, useEffect} from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import logodfdf from '../images/logodfdf.png'
import useAutocomplete from '@material-ui/lab/useAutocomplete';
import { makeStyles } from '@material-ui/core/styles';
import {AppContext} from '../context/appContext';

  const useStyles = makeStyles((theme) => ({
    label: {
      display: 'block',
    },
    input: {
      width: 500,
      height:35
    },
    listbox: {
      width: 500,
      margin: 0,
      padding: 0,
      zIndex: 1,
      position: 'absolute',
      listStyle: 'none',
      backgroundColor: theme.palette.background.paper,
      overflow: 'auto',
      maxHeight: 200,
      border: '1px solid rgba(0,0,0,.25)',
      '& li[data-focus="true"]': {
        backgroundColor: '#4a8df6',
        color: 'white',
        cursor: 'pointer',
      },
      '& li:active': {
        backgroundColor: '#2977f5',
        color: 'white',
      },
    },
}));
const Header = () => {
    const classes = useStyles();
    const {listingState, listingDispatch} = useContext(AppContext)
    const {moviesData} = listingState;
    const {
        getRootProps,
        getInputLabelProps,
        getInputProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
    } = useAutocomplete({
      id: 'use-autocomplete-demo',
      options: moviesData,
      getOptionLabel: (option) => option.Title,
    });
    const {value} =  getInputProps();
    useEffect(() => {
      listingDispatch({type:"GET_FILTERED_DATA", payload:""})
    },[])
    useEffect(() => {
      value !== "" && listingDispatch({type:"GET_FILTERED_DATA", payload:value});
    },[value])
    return(
        <header>
            <Container justify="space-between">
                <Grid container spacing={3}>
                    <Grid item xs={2} className={"logo-wrp"} >
                        <img src={logodfdf}/>
                    </Grid>
                    <Grid item xs={10} className="searchBox-wrp">
                        <div>
                            <div {...getRootProps()}>
                            
                                <input className={classes.input} {...getInputProps()} />
                            </div>
                            {groupedOptions.length > 0 ? (
                                <ul className={classes.listbox} {...getListboxProps()}>
                                {groupedOptions.map((option, index) => (
                                    <li {...getOptionProps({ option, index })}>{option.Title}</li>
                                ))}
                                </ul>
                            ) : null}
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </header>
    )
}

export default Header
