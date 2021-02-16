import React, { useState, useEffect, useContext, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

// Material UI
import { Box, Button, Container, makeStyles } from '@material-ui/core';

// Components
import CarCards from '../profile/CarCards';
import RentalCards from '../profile/RentalCards';
import FormModal from '../profile/FormModal';
import ServerResponse from '../layout/ServerResponse';

// Assets
import NoBookings from '../../assets/featback/no-bookings.svg';
import NoRentals from '../../assets/featback/no-rentals.svg';
import NoCars from '../../assets/featback/no-cars.svg';

// Context
import ProfileContext from '../../context/profile/profileContext';
import QueryContext from '../../context/query/queryContext';
import { SET_MODAL } from '../../context/types';

// Define Style
const useStyles = makeStyles((theme) => ({
  carsCont: {
    // minHeight: '100vh',
    // width: '100%',
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
    minHeight: '100vh',
    width: '100%',
  },
  carsMenuCont: {
    padding: theme.spacing(2, 5),
    minHeight: '120px',
    width: '100vw',
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    position: 'fixed',
    top: 0,
    zIndex: 2,
  },
  content: {
    paddingTop: theme.spacing(30),
    minHeight: '60vh',
  },
  noContent: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  carCards: {
    display: 'flex',
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
  img: {
    maxWidth: 300,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  span: {
    color: theme.palette.primary.main,
  },
}));

const Profile = (props) => {
  // ===== STYLE =====
  const classes = useStyles();

  // ===== CONTEXT ======
  // Profile Context
  const profileContext = useContext(ProfileContext);
  const {
    loading,
    serverModalOpen,
    server,
    resetForm,
    deleteFromDatabase,
    setValue,
  } = profileContext;
  // Query Context
  const queryContext = useContext(QueryContext);
  const { rentals, cars, getRentals, getCars } = queryContext;

  // ===== FUNCTIONS =====
  // State
  const [page, setPage] = useState();

  useEffect(() => {
    // get bookings/rentals/cars
    getRentals();
    getCars();
    // Component Mount ScrollToTop
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, []);

  // router listener setPage
  useEffect(() => {
    switch (props.location.search.split('=')[1]) {
      case 'rentals':
        getRentals();
        setPage('rentals');
        break;
      case 'cars':
        getCars();
        setPage('cars');
        break;
      default:
        setPage('bookings');
        break;
    }
    // eslint-disable-next-line
  }, [props.location.search.split('=')[1]]);

  // Handle Tab
  const handleTab = (tab) => {
    props.history.push(`profile?tab=${tab}`);
  };

  // Handle Modal
  const handleModal = (data) => {
    setValue(SET_MODAL, data);
  };

  return (
    <Fragment>
      <div className={classes.carsCont}>
        <div className={classes.carsMenuCont}>
          <Button
            onClick={() => handleTab('bookings')}
            variant='outlined'
            color={page === 'bookings' ? 'primary' : 'default'}
            className={classes.menuButton}
          >
            bookings
          </Button>
          <Button
            onClick={() => handleTab('rentals')}
            color={page === 'rentals' ? 'primary' : 'default'}
            variant='outlined'
            className={classes.menuButton}
          >
            rentals
          </Button>
          <Button
            onClick={() => handleTab('cars')}
            color={page === 'cars' ? 'primary' : 'default'}
            variant='outlined'
          >
            cars
          </Button>
        </div>
        {page === 'bookings' ? (
          <div className={classes.content}>
            <Container maxWidth='lg'>
              <div className={classes.noContent}>
                <img
                  className={classes.img}
                  src={NoBookings}
                  alt='no-cars-yet'
                />
                <h4 className={classes.h4}>No bookings found</h4>
                <p className={classes.p}>You have no bookings, yet.</p>
                <Button color='primary' variant='outlined'>
                  Find a car to rent
                </Button>
              </div>
            </Container>
          </div>
        ) : page === 'rentals' ? (
          rentals.length === 0 ? (
            <div className={classes.content}>
              <Container maxWidth='lg'>
                <div className={classes.noContent}>
                  <img
                    className={classes.img}
                    src={NoRentals}
                    alt='no-cars-yet'
                  />
                  <h4 className={classes.h4}>No rentals found</h4>
                  <p className={classes.p}>
                    You don't have any rental offers at the moment.
                  </p>
                  <Button
                    color='primary'
                    variant='outlined'
                    onClick={() => handleModal({ open: true, type: 'rentals' })}
                  >
                    Add rental offer
                  </Button>
                </div>
              </Container>
            </div>
          ) : (
            <Box mt={20}>
              <h2 style={{ textAlign: 'center' }}>
                Your <span className={classes.span}>Rental Offers</span>
              </h2>
              <RentalCards
                array={rentals}
                handleModal={handleModal}
                handleDelete={deleteFromDatabase}
              />
            </Box>
          )
        ) : page === 'cars' ? (
          cars.length === 0 ? (
            <div className={classes.content}>
              <Container maxWidth='lg'>
                <div className={classes.noContent}>
                  <img className={classes.img} src={NoCars} alt='no-cars-yet' />
                  <h4 className={classes.h4}>No cars found</h4>
                  <p className={classes.p}>You haven't added any cars, yet.</p>
                  <Button
                    color='primary'
                    variant='outlined'
                    onClick={() => handleModal({ open: true, type: 'cars' })}
                  >
                    Add new car
                  </Button>
                </div>
              </Container>
            </div>
          ) : (
            <Box mt={20}>
              <h2 style={{ textAlign: 'center' }}>
                Your <span className={classes.span}>Cars</span>
              </h2>
              <CarCards
                array={cars}
                handleModal={handleModal}
                handleDelete={deleteFromDatabase}
              />
            </Box>
          )
        ) : (
          <div></div>
        )}
      </div>
      <FormModal handleModal={handleModal} />
      <ServerResponse
        type='Delete'
        loading={loading}
        modalOpen={serverModalOpen}
        server={server}
        close={resetForm}
        reload={{ getRentals, getCars }}
      />
    </Fragment>
  );
};

export default withRouter(Profile);
