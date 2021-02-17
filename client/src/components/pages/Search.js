import React from 'react';
import { Fragment, useEffect, useContext } from 'react';

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
import ResultCards from '../search/ResultCards';

// Assets
import NoResults from '../../assets/featback/no-bookings.svg';

// Context
import QueryContext from '../../context/query/queryContext';

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
  resultsCont: {
    marginTop: theme.spacing(5),
  },
  noContent: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  img: {
    marginTop: theme.spacing(5),
    maxWidth: 300,
  },
  h4: {
    fontSize: '1.6em',
    fontWeight: '500',
    color: theme.palette.primary.main,
    marginBottom: 0,
  },
  p: {
    fontSize: '1.3em',
    textAlign: 'center',
  },
}));

const Search = (props) => {
  // ===== STYLE =====
  const classes = useStyles();
  const theme = useTheme();
  // Media Queries
  let xsdown = useMediaQuery(theme.breakpoints.down('xs'));

  // ===== CONTEXT =====
  const queryContext = useContext(QueryContext);
  const {
    car,
    location,
    checkIn,
    checkOut,
    color,
    fuelType,
    rentals,
    loading,
    getRentals,
  } = queryContext;

  // ===== FUNCTIONS =====
  useEffect(() => {
    // Component Mount ScrollToTop
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, []);

  // Search
  useEffect(() => {
    getRentals('', 'public', 'search');
  }, [car, location, checkIn, checkOut, color, fuelType]);

  return (
    <Fragment>
      <div className={classes.searchCont}>
        {/* <div className={classes.imgCont}>
          <img src={TopImg} className={classes.topImg}></img>
        </div> */}
        <Container maxWidth='lg'>
          <FullSearch />
          <div className={classes.resultsCont}>
            {rentals !== undefined && rentals.length !== 0 ? (
              <ResultCards array={rentals} />
            ) : (
              <div className={classes.noContent}>
                <img className={classes.img} src={NoResults} alt='no-results' />
                <h4 className={classes.h4}>No cars found</h4>
                <p className={classes.p}>No matching cars were found</p>
              </div>
            )}
          </div>
        </Container>
      </div>
    </Fragment>
  );
};

export default Search;
