import React, { Fragment, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import AliceCarousel from 'react-alice-carousel';
import { SRLWrapper } from 'simple-react-lightbox';

// Date
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

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
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from '@material-ui/pickers';

// Material UI Icons
import RoomIcon from '@material-ui/icons/Room';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import FastForwardIcon from '@material-ui/icons/FastForward';
import LocalGasStationIcon from '@material-ui/icons/LocalGasStation';
import AirlineSeatReclineNormalIcon from '@material-ui/icons/AirlineSeatReclineNormal';

// Components
import Loading from '../layout/Loading';

// Context
import AuthContext from '../../context/auth/authContext';
import QueryContext from '../../context/query/queryContext';
import BookingContext from '../../context/booking/bookingContext';
import { SET_CHECK_IN, SET_CHECK_OUT } from '../../context/types';

// Utils
import hexToRGB from '../../utils/hexToRGB';

// Define Style
const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '100vh',
    paddingTop: '64px',
  },
  profile: {
    borderRadius: 5,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(5),
  },
  profileInfo: {
    fontSize: '1.1em',
    lineHeight: 2.5,
  },
  properties: {
    marginTop: theme.spacing(2),
    borderRadius: 5,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
  },
  propertiesMobile: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexWrap: 'wrap',
  },
  card: {
    // height: '100%',
    borderRadius: 5,
    backgroundColor: theme.palette.background.paper,
  },
  cardCont: {
    position: 'relative',
  },
  carName: {
    fontSize: '2.8em',
    fontWeight: 600,
    position: 'absolute',
    top: '-30px',
  },
  rentalInfo: {
    marginTop: '10px',
    fontSize: '1.2em',
    fontWeight: '500',
  },
  datepicker: {
    marginTop: theme.spacing(3),
  },
  bookingBtn: {
    marginTop: theme.spacing(2),
    border: 'none',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    width: '100%',
    backgroundColor: theme.palette.primary.main,
    height: '50px',
    fontSize: '1.2em',
    outline: 'none',
  },
  h2: {
    fontSize: '1.4em',
  },
  h4: {
    fontSize: '1.1em',
    fontWeight: '400',
  },
  p: {
    fontSize: '1.3em',
    textAlign: 'center',
  },
  media: {
    width: '100%',
    filter: 'brightness(.7)',
  },
  img: {
    width: 150,
  },
  rentalCont: {
    display: 'flex',
    flexWrap: 'wrap',
    position: 'relative',
  },
  loadingCont: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    width: 500,
  },
  imgMobile: {
    width: 120,
  },
}));

const Offers = (props) => {
  // ====== STYLE ======
  const classes = useStyles();

  const theme = useTheme();

  // Lightbox Settings
  const lightboxOptions = {
    settings: {
      overlayColor: hexToRGB(theme.palette.background.paper, 0.9),
      autoPlaySpeed: 3000,
      transitionSpeed: 500,
    },
    buttons: {
      backgroundColor: hexToRGB(theme.palette.background.paper, 0.1),
      iconColor: theme.palette.primary.light,
      showDownloadButton: false,
      showThumbnailsButton: false,
    },
    caption: {
      showCaption: false,
    },
    thumbnails: {
      showThumbnails: false,
    },
  };

  let mddown = useMediaQuery(theme.breakpoints.down('md'));
  let xsdown = useMediaQuery(theme.breakpoints.down('xs'));

  // ====== CONTEXT =======
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;
  const queryContext = useContext(QueryContext);
  const {
    rental,
    rentals,
    owner,
    getRentals,
    getOwner,
    clearValues,
  } = queryContext;

  const bookingContext = useContext(BookingContext);
  const { checkIn, checkOut, setValue } = bookingContext;

  // ====== FUNCTIONS =======

  // get rental id
  const id = props.location.search.split('=')[1];
  // get rental
  useEffect(() => {
    getRentals(id, 'public', 'single');
    // eslint-disable-next-line
  }, [id]);

  // push images, get other offers, get owner
  useEffect(() => {
    if (rental) {
      getRentals(rental.user_id, 'public', 'user');
      getOwner(rental.user_id);
    }
  }, [rental]);

  useEffect(() => {
    // set booking date
    setValue(SET_CHECK_IN, queryContext.checkIn);
    setValue(SET_CHECK_OUT, queryContext.checkOut);
    // Component Mount ScrollToTop
    window.scrollTo(0, 0);
    // Component Unmount Clear Values
    return () => clearValues();
  }, []);

  const handleDateChange = (date, value, type) => {
    setValue(type, date);
  };

  return (
    <Fragment>
      {rental && rentals && owner ? (
        <div className={classes.container}>
          <Container maxWidth='lg'>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={7} md={9}>
                <div className={classes.card}>
                  <div className={classes.mediaCont}>
                    <SRLWrapper options={lightboxOptions}>
                      <AliceCarousel
                        mouseTracking
                        animationType='fadeout'
                        autoPlay={true}
                        autoPlayInterval={3000}
                        infinite={true}
                        disableButtonsControls={true}
                        disableSlideInfo={true}
                        disableDotsControls={true}
                      >
                        {rental.car.pictures.map((el, index) => {
                          return (
                            <img
                              key={index}
                              src={el}
                              alt={'Image ' + index}
                              className={classes.media}
                            />
                          );
                        })}
                      </AliceCarousel>
                    </SRLWrapper>
                  </div>
                  <CardContent className={classes.cardCont}>
                    <Typography
                      gutterBottom
                      variant='h4'
                      component='h2'
                      color='primary'
                      className={classes.carName}
                    >
                      {rental.car.label}
                    </Typography>
                    <div className={classes.rentalCont}>
                      <Box
                        display='flex'
                        alignItems='center'
                        lineHeight={3}
                        className={classes.rentalInfo}
                        mr={3}
                      >
                        <AttachMoneyIcon />
                        <Box ml={1}>{rental.price + ' ' + rental.billing}</Box>
                      </Box>
                      <Box
                        display='flex'
                        alignItems='center'
                        lineHeight={3}
                        className={classes.rentalInfo}
                        mr={3}
                      >
                        <RoomIcon />
                        <Box ml={1}>{rental.location.label}</Box>
                      </Box>
                    </div>
                    {mddown && (
                      <div className={classes.propertiesMobile}>
                        <Box
                          display='flex'
                          alignItems='center'
                          mr={3}
                          lineHeight={3}
                          className={classes.h4}
                        >
                          <FastForwardIcon />
                          <Box ml={1}>{rental.car.kmDriven}</Box>
                        </Box>
                        <Box
                          display='flex'
                          alignItems='center'
                          mr={3}
                          lineHeight={3}
                          className={classes.h4}
                        >
                          <LocalGasStationIcon />
                          <Box ml={1}>{rental.car.fueltype}</Box>
                        </Box>
                        <Box
                          display='flex'
                          alignItems='center'
                          mr={3}
                          lineHeight={3}
                          className={classes.h4}
                        >
                          <AirlineSeatReclineNormalIcon />
                          <Box ml={1}>{rental.car.seats}</Box>
                        </Box>
                        <Box
                          display='flex'
                          alignItems='center'
                          mr={3}
                          lineHeight={3}
                          className={classes.h4}
                        >
                          <ColorLensIcon />
                          <Box ml={1}>{rental.car.color}</Box>
                        </Box>
                        <Box
                          display='flex'
                          alignItems='center'
                          lineHeight={3}
                          className={classes.h4}
                        >
                          <AccessTimeIcon />
                          <Box ml={1}>{rental.car.year}</Box>
                        </Box>
                      </div>
                    )}
                    <div className={classes.datepicker}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container spacing={1}>
                          <Grid item xs={6} sm={6}>
                            <KeyboardDateTimePicker
                              fullWidth
                              autoOk
                              ampm={false}
                              variant='inline'
                              size='small'
                              inputVariant='outlined'
                              disablePast
                              format='MM/dd/yyyy HH:mm'
                              id='dateFrom'
                              label='Check In'
                              value={checkIn}
                              onChange={(date, value) =>
                                handleDateChange(date, value, SET_CHECK_IN)
                              }
                              KeyboardButtonProps={{
                                'aria-label': 'Check in day',
                              }}
                            />
                          </Grid>
                          <Grid item xs={6} sm={6}>
                            <KeyboardDateTimePicker
                              fullWidth
                              autoOk
                              ampm={false}
                              variant='inline'
                              size='small'
                              inputVariant='outlined'
                              disablePast
                              format='MM/dd/yyyy HH:mm'
                              id='dateTo'
                              label='Check Out'
                              value={checkOut}
                              onChange={(date, value) =>
                                handleDateChange(date, value, SET_CHECK_OUT)
                              }
                              KeyboardButtonProps={{
                                'aria-label': 'Check out day',
                              }}
                            />
                          </Grid>
                        </Grid>
                      </MuiPickersUtilsProvider>
                    </div>
                  </CardContent>
                  <button className={classes.bookingBtn} type='click'>
                    {isAuthenticated ? 'BOOK NOW' : 'LOGIN TO BOOK'}
                  </button>
                </div>
              </Grid>
              <Grid item xs={12} sm={5} md={3}>
                <div className={classes.profile}>
                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={12}>
                      {!xsdown ? (
                        <Box display='flex' justifyContent='center'>
                          <img
                            src={owner.image}
                            alt='profile-img'
                            className={classes.img}
                          />
                        </Box>
                      ) : (
                        <img
                          src={owner.image}
                          alt='profile-img'
                          className={classes.imgMobile}
                        />
                      )}
                    </Grid>
                    <Grid item xs={6} sm={12}>
                      {!xsdown ? (
                        <Box
                          display='flex'
                          flexDirection='column'
                          alignItems='center'
                        >
                          <h2 className={classes.h2}>{owner.username}</h2>
                          <div className={classes.profileInfo}>
                            {owner.city}
                          </div>
                          <div className={classes.profileInfo}>
                            Registered {owner.date.split('T')[0]}
                          </div>
                        </Box>
                      ) : (
                        <Fragment>
                          <h2 className={classes.h2}>{owner.username}</h2>
                          <div className={classes.profileInfo}>
                            {owner.city}
                          </div>
                          <div className={classes.profileInfo}>
                            Registered {owner.date.split('T')[0]}
                          </div>
                        </Fragment>
                      )}
                    </Grid>
                  </Grid>
                </div>
                {!mddown && (
                  <div className={classes.properties}>
                    <div>
                      <h3>Car Properties</h3>
                      <Box
                        display='flex'
                        alignItems='center'
                        mr={3}
                        lineHeight={3}
                        className={classes.h4}
                      >
                        <FastForwardIcon />
                        <Box ml={1}>{rental.car.kmDriven}</Box>
                      </Box>
                      <Box
                        display='flex'
                        alignItems='center'
                        mr={3}
                        lineHeight={3}
                        className={classes.h4}
                      >
                        <LocalGasStationIcon />
                        <Box ml={1}>{rental.car.fueltype}</Box>
                      </Box>
                      <Box
                        display='flex'
                        alignItems='center'
                        mr={3}
                        lineHeight={3}
                        className={classes.h4}
                      >
                        <AirlineSeatReclineNormalIcon />
                        <Box ml={1}>{rental.car.seats}</Box>
                      </Box>
                      <Box
                        display='flex'
                        alignItems='center'
                        mr={3}
                        lineHeight={3}
                        className={classes.h4}
                      >
                        <ColorLensIcon />
                        <Box ml={1}>{rental.car.color}</Box>
                      </Box>
                      <Box
                        display='flex'
                        alignItems='center'
                        lineHeight={3}
                        className={classes.h4}
                      >
                        <AccessTimeIcon />
                        <Box ml={1}>{rental.car.year}</Box>
                      </Box>
                    </div>
                  </div>
                )}
              </Grid>
            </Grid>
          </Container>
        </div>
      ) : (
        <div className={classes.loadingCont}>
          <Loading classes={classes.loading} />
        </div>
      )}
    </Fragment>
  );
};

export default withRouter(Offers);
