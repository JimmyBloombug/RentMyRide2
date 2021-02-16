import React from 'react';
import { Fragment, useEffect } from 'react';

// Material UI
import {
  Grid,
  CardContent,
  Box,
  Typography,
  Container,
  makeStyles,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';

// Components
import FullSearch from '../search/FullSearch';

// Assets
import TopImg from '../../assets/search/search.jpg';

// Define Style
const useStyles = makeStyles((theme) => ({
  searchCont: {
    minHeight: '100vh',
    marginTop: '64px',
    height: '100%',
    width: '100%',
  },
  imgCont: {
    marginBottom: theme.spacing(2),
  },
  topImg: {
    width: '100vw',
    height: '60vh',
    objectFit: 'cover',
    filter: 'blur(4px) brightness(1.3) hue-rotate(300deg)',
  },
  searchOptions: {
    borderRadius: 5,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(5),
  },
}));

const Search = (props) => {
  // ===== STYLE =====
  const classes = useStyles();
  const theme = useTheme();
  // Media Queries
  let xsdown = useMediaQuery(theme.breakpoints.down('xs'));

  // ===== CONTEXT =====

  // ===== FUNCTIONS =====
  useEffect(() => {
    // Component Mount ScrollToTop
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <div className={classes.searchCont}>
        {/* <div className={classes.imgCont}>
          <img src={TopImg} className={classes.topImg}></img>
        </div> */}
        <Container maxWidth='lg'>
          <FullSearch />
        </Container>
      </div>
    </Fragment>
  );
};

export default Search;
