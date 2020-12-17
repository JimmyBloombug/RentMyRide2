import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

// Material UI
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
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
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  card: {
    height: 500,
    position: 'relative',
    margin: theme.spacing(0, 1),
    width: 370,
  },
  media: {
    height: 200,
  },
  cont: {
    height: 500,
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
}));

const Cards = (props) => {
  // ====== STYLE ======
  const classes = useStyles();

  // ===== Functions ======
  // Handle Click
  const handleClick = (id) => {
    props.history.push(`/offers?id=${id}`);
  };

  return (
    <div className={classes.container}>
      {props.array.map((rental, index) => {
        return (
          <Card
            className={classes.card}
            key={rental._id}
            onClick={() => handleClick(rental._id)}
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
      })}
    </div>
  );
};

Cards.propTypes = {
  array: PropTypes.array.isRequired,
  bp: PropTypes.object.isRequired,
};

Cards.defaultProps = {
  map: 'all',
  xs: 12,
  sm: 4,
  md: 3,
  lg: 3,
};

export default withRouter(Cards);
