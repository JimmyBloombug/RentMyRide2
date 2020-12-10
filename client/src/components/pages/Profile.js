import React, { useState, useEffect, useContext, Fragment } from 'react';
import axios from 'axios';

// Material UI
import { Box, Button, Container, makeStyles } from '@material-ui/core';

// Components
import CarCards from '../cars/CarCards';
import FormModal from '../cars/FormModal';
import Footer from '../layout/Footer';

// Assets
import NoBookings from '../../assets/featback/no-bookings.svg';
import NoRentals from '../../assets/featback/no-rentals.svg';
import NoCars from '../../assets/featback/no-cars.svg';

// Context
import AuthContext from '../../context/auth/authContext';

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
}));

const Profile = () => {
  // ===== STYLE =====
  const classes = useStyles();

  // ===== CONTEXT ======
  // Auth Context
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  // ===== FUNCTIONS =====
  // State
  const [page, setPage] = useState('bookings');
  const [modal, setModal] = useState({ open: false, type: '' });
  const [cars, setCars] = useState(undefined);

  // get cars
  const getCars = async () => {
    // set headers
    const config = {
      headers: {
        user_id: user._id,
      },
    };

    // server request
    const res = await axios.get('server/cars', config);

    // set cars = server response
    console.log(res.data);
    setCars(res.data);
  };

  // get cars/rentals/bookings
  useEffect(() => {
    getCars();
  }, []);

  console.log(cars);

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
                  onClick={() => setModal({ open: true, type: 'rentals' })}
                >
                  Add rental offer
                </Button>
              </div>
            </Container>
          </div>
        ) : page === 'cars' ? (
          cars === [] ? (
            <div className={classes.content}>
              <Container maxWidth='md'>
                <div className={classes.noContent}>
                  <img className={classes.img} src={NoCars} alt='no-cars-yet' />
                  <h4 className={classes.h4}>No cars found</h4>
                  <p className={classes.p}>You haven't added any cars, yet.</p>
                  <Button
                    color='primary'
                    variant='outlined'
                    onClick={() => setModal({ open: true, type: 'cars' })}
                  >
                    Add new car
                  </Button>
                </div>
              </Container>
            </div>
          ) : (
            <Box mt={20}>
              <h2 style={{ textAlign: 'center' }}>Your Cars</h2>
              <CarCards type='cars' array={cars} />
            </Box>
          )
        ) : (
          <div></div>
        )}
      </div>
      <FormModal modal={modal} handleModal={setModal} />
      <Footer />
    </Fragment>
  );
};

export default Profile;
