import React, { Fragment, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import AliceCarousel from 'react-alice-carousel';
import { SRLWrapper } from 'simple-react-lightbox';

// Material UI
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Box,
  Typography,
  Button,
  Container,
  makeStyles,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';

// Material UI Icons
import RoomIcon from '@material-ui/icons/Room';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import FastForwardIcon from '@material-ui/icons/FastForward';
import LocalGasStationIcon from '@material-ui/icons/LocalGasStation';
import AirlineSeatReclineNormalIcon from '@material-ui/icons/AirlineSeatReclineNormal';

// Components
import Loading from '../layout/Loading';

// Context
import QueryContext from '../../context/query/queryContext';

// Utils
import hexToRGB from '../../utils/hexToRGB';

// Define Style
const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '100vh',
    paddingTop: '64px',
    // paddingRight: theme.spacing(5),
    // paddingLeft: theme.spacing(5),
  },
  profile: {
    borderRadius: 5,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(5, 5),
  },
  profileInfo: {
    fontSize: '1.1em',
    lineHeight: 2.5,
  },
  card: {
    borderRadius: 5,
    backgroundColor: theme.palette.background.paper,
  },
  h2: {
    fontSize: '1.8em',
  },
  h4: {
    fontSize: '1.6em',
    fontWeight: '400',
  },
  p: {
    fontSize: '1.3em',
    textAlign: 'center',
  },
  media: {
    width: '100%',
  },
  img: {
    width: 150,
  },
  rentalCont: {
    display: 'flex',
    flexWrap: 'wrap',
    position: 'relative',
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
    thumbnails: {
      showThumbnails: false,
    },
  };

  let xsdown = useMediaQuery(theme.breakpoints.down('xs'));

  // ====== CONTEXT =======
  const queryContext = useContext(QueryContext);
  const { rental, rentals, owner, getRentals, getOwner } = queryContext;

  // ====== FUNCTIONS =======

  // get rental id
  const id = props.location.search.split('=')[1];
  // get rental
  useEffect(() => {
    getRentals(id, 'public', 'single');
    // eslint-disable-next-line
  }, [id]);

  let rentalImages;
  // push images, get other offers, get owner
  useEffect(() => {
    if (rental) {
      getRentals(rental.user_id, 'public', 'user');
      getOwner(rental.user_id);
    }
  }, [rental]);

  useEffect(() => {}, []);

  return (
    <Fragment>
      {rental && rentals && owner ? (
        <div className={classes.container}>
          <Container maxWidth='lg'>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={5} md={4}>
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
                            {owner.city + ', ' + owner.country.label}
                          </div>
                          <div className={classes.profileInfo}>
                            Registered {owner.date.split('T')[0]}
                          </div>
                        </Box>
                      ) : (
                        <Fragment>
                          <h2 className={classes.h2}>{owner.username}</h2>
                          <div className={classes.profileInfo}>
                            {owner.city + ', ' + owner.country.label}
                          </div>
                          <div className={classes.profileInfo}>
                            Registered {owner.date.split('T')[0]}
                          </div>
                        </Fragment>
                      )}
                    </Grid>
                  </Grid>
                </div>
              </Grid>
              <Grid item xs={12} sm={7} md={8}>
                <div className={classes.card}>
                  <div className={classes.mediaCont}>
                    <SRLWrapper options={lightboxOptions}>
                      <AliceCarousel
                        mouseTracking
                        items={rentalImages}
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
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant='h3'
                      component='h2'
                      color='primary'
                    >
                      {rental.car.label}
                    </Typography>
                    <div className={classes.rentalCont}>
                      <Box
                        display='flex'
                        alignItems='center'
                        lineHeight={3}
                        className={classes.h4}
                        mr={3}
                      >
                        <AttachMoneyIcon />
                        <Box ml={1}>{rental.price + ' ' + rental.billing}</Box>
                      </Box>
                      <Box
                        display='flex'
                        alignItems='center'
                        lineHeight={3}
                        className={classes.h4}
                        mr={3}
                      >
                        <RoomIcon />
                        <Box ml={1}>{rental.location.label}</Box>
                      </Box>
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
                        <ColorLensIcon />
                        <Box ml={1}>{rental.car.year}</Box>
                      </Box>
                    </div>
                  </CardContent>
                </div>
              </Grid>
            </Grid>
          </Container>
        </div>
      ) : (
        <div
          style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Loading classes={classes.loading} />
        </div>
      )}
    </Fragment>
  );
};

export default withRouter(Offers);
