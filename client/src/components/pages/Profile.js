import React, { useState, useEffect, useContext, Fragment } from 'react';

// Material UI
import { Box, Button, Container, makeStyles } from '@material-ui/core';

// Components
import CarCards from '../profile/CarCards';
import FormModal from '../profile/FormModal';
import Footer from '../layout/Footer';

// Assets
import NoBookings from '../../assets/featback/no-bookings.svg';
import NoRentals from '../../assets/featback/no-rentals.svg';
import NoCars from '../../assets/featback/no-cars.svg';

// Context
import AuthContext from '../../context/auth/authContext';
import ProfileContext from '../../context/profile/profileContext';
import { SET_MODAL, SET_USER_ID } from '../../context/types';

// Define Style
const useStyles = makeStyles((theme) => ({
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
    marginTop: theme.spacing(30),
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

const Profile = () => {
  // ===== STYLE =====
  const classes = useStyles();

  // ===== CONTEXT ======
  // Auth Context
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  // Car Context
  const profileContext = useContext(ProfileContext);
  const { user_id, cars, setValue, getCars } = profileContext;

  // ===== FUNCTIONS =====
  // State
  const [page, setPage] = useState('bookings');

  // Set User ID
  useEffect(() => {
    if (user_id === undefined) {
      setValue(SET_USER_ID, user._id);
    }
    // eslint-disable-next-line
  }, [user_id]);

  // get cars/rentals/bookings
  useEffect(() => {
    getCars(user._id);
    // eslint-disable-next-line
  }, []);

  const handleModal = (data) => {
    setValue(SET_MODAL, data);
  };

  return (
    <Fragment>
      <div className={classes.carsCont}>
        <div className={classes.carsMenuCont}>
          <Button
            onClick={() => setPage('bookings')}
            variant='outlined'
            color={page === 'bookings' ? 'primary' : 'default'}
            className={classes.menuButton}
          >
            bookings
          </Button>
          <Button
            onClick={() => setPage('rentals')}
            color={page === 'rentals' ? 'primary' : 'default'}
            variant='outlined'
            className={classes.menuButton}
          >
            rentals
          </Button>
          <Button
            onClick={() => setPage('cars')}
            color={page === 'cars' ? 'primary' : 'default'}
            variant='outlined'
          >
            cars
          </Button>
        </div>
        {page === 'bookings' ? (
          <div className={classes.content}>
            <Container maxWidth='md'>
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
          <div className={classes.content}>
            <Container maxWidth='md'>
              <div className={classes.noContent}>
                <img
                  className={classes.img}
                  src={NoRentals}
                  alt='no-cars-yet'
                />
                <h4 className={classes.h4}>No rentals found</h4>
                <p className={classes.p}>
                  You don't have any rentals at the moment.
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
        ) : page === 'cars' ? (
          cars.length === 0 ? (
            <div className={classes.content}>
              <Container maxWidth='md'>
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
              <CarCards array={cars} handleModal={handleModal} />
            </Box>
          )
        ) : (
          <div></div>
        )}
      </div>
      <FormModal handleModal={handleModal} />
      <Footer />
    </Fragment>
  );
};

export default Profile;
