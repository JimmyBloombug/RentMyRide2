import React from 'react';
import PropTypes from 'prop-types';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

// Material UI
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from '@material-ui/core';

// Material UI Icons
import RoomIcon from '@material-ui/icons/Room';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import FastForwardIcon from '@material-ui/icons/FastForward';
import LocalGasStationIcon from '@material-ui/icons/LocalGasStation';
import AirlineSeatReclineNormalIcon from '@material-ui/icons/AirlineSeatReclineNormal';

// Style
const useStyles = makeStyles((theme) => ({
  card: {
    height: 460,
    position: 'relative',
  },
  cont: {
    height: 460,
  },
  media: {
    height: 200,
  },
  info: {
    display: 'flex',
    flexWrap: 'wrap',
    fontSize: '1.2em',
    fontWeight: 600,
    position: 'relative',
  },
  carName: {
    height: 80,
    display: 'flex',
    alignItems: 'center',
  },
  attributes: {
    color: '#b9babd',
    fontWeight: 500,
  },
  attributesMargin: {
    marginRight: 10,
  },
  addNew: {
    background: 'rgb(61,108,125)',
    background:
      'linear-gradient(12deg, rgba(61,108,125,1) 0%, rgba(17,39,47,1) 100%)',
  },
  addNewCont: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIcon: {
    width: 50,
    height: 50,
  },
}));

const Slider = (props) => {
  //  ====== STYLE =======
  const classes = useStyles();

  // ======= FUNCTIONS =========
  const handleDragStart = (e) => e.preventDefault();

  // ====== ITEMS =======
  let items = props.array.map((rental, index) => {
    return (
      <Card
        className={classes.card}
        onDragStart={handleDragStart}
        // onClick={() => handleClick(index)}
      >
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={rental.car.pictures[0]}
            title={rental.car.label}
          />
          <CardContent className={classes.cont}>
            <Typography
              gutterBottom
              variant='h5'
              component='h2'
              className={classes.carName}
              color='primary'
            >
              {rental.car.label}
            </Typography>
            <div className={classes.info}>
              <Box display='flex' alignItems='center' mr={2} lineHeight={3}>
                <AttachMoneyIcon />
                <Box ml={1}>{rental.price + ' ' + rental.billing}</Box>
              </Box>
              <Box display='flex' alignItems='center' mr={2} lineHeight={3}>
                <RoomIcon />
                <Box ml={1}>{rental.location.label}</Box>
              </Box>
              <Box display='flex' alignItems='center' mr={2} lineHeight={3}>
                <FastForwardIcon />
                <Box ml={1}>{rental.car.kmDriven}</Box>
              </Box>
              <Box display='flex' alignItems='center' mr={2} lineHeight={3}>
                <LocalGasStationIcon />
                <Box ml={1}>{rental.car.fueltype}</Box>
              </Box>
              <Box display='flex' alignItems='center' mr={2} lineHeight={3}>
                <AirlineSeatReclineNormalIcon />
                <Box ml={1}>{rental.car.seats}</Box>
              </Box>
              <Box display='flex' alignItems='center' lineHeight={3}>
                <ColorLensIcon />
                <Box ml={1}>{rental.car.color}</Box>
              </Box>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  });

  return (
    <div>
      <AliceCarousel
        mouseTracking
        items={items}
        animationType='fadeout'
        autoPlay={true}
        autoPlayInterval={1800}
        infinite={true}
        controlsStrategy='responsive'
        disableButtonsControls={true}
      />
    </div>
  );
};

Slider.propTypes = {
  array: PropTypes.array.isRequired,
};

export default Slider;
