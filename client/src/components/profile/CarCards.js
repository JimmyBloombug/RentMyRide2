import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

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
  IconButton,
  Icon,
} from '@material-ui/core';

// Material UI Icons
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import FastForwardIcon from '@material-ui/icons/FastForward';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import LocalGasStationIcon from '@material-ui/icons/LocalGasStation';
import AirlineSeatReclineNormalIcon from '@material-ui/icons/AirlineSeatReclineNormal';

// Utils
import hexToRGB from '../../utils/hexToRGB';
import { Fragment } from 'react';

// Style
const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(0, 4),
  },
  card: {
    height: 500,
    position: 'relative',
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
  attributesMargin: {
    marginRight: 10,
  },
  cardEditInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 50,
    display: 'flex',
    backgroundColor: hexToRGB(theme.palette.primary.main, 0.2),
    justifyContent: 'space-around',
    alignItems: 'center',
    fontSize: '1.3em',
    fontWeight: 500,
    color: '#DD3D31',
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

const CarCards = (props) => {
  // ====== STYLE ======
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            className={clsx(classes.card, classes.addNew)}
            onClick={() => props.handleModal({ open: true, type: 'cars' })}
          >
            <CardActionArea>
              <CardContent className={clsx(classes.cont, classes.addNewCont)}>
                <AddIcon className={classes.addIcon} />
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        {props.array.map((car, index) => {
          return (
            <Grid item xs={12} sm={6} md={3} key={car._id}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={car.pictures[0]}
                    title={car.label}
                  />
                  <CardContent className={classes.cont}>
                    <Typography
                      gutterBottom
                      variant='h5'
                      component='h2'
                      className={classes.carName}
                      color='primary'
                    >
                      {car.label}
                    </Typography>
                    <div className={classes.info}>
                      <Box
                        display='flex'
                        alignItems='center'
                        mr={2}
                        lineHeight={3}
                      >
                        <FastForwardIcon />
                        <Box ml={1}>{car.kmDriven}</Box>
                      </Box>
                      <Box
                        display='flex'
                        alignItems='center'
                        mr={2}
                        lineHeight={3}
                      >
                        <LocalGasStationIcon />
                        <Box ml={1}>{car.fueltype}</Box>
                      </Box>
                      <Box
                        display='flex'
                        alignItems='center'
                        mr={2}
                        lineHeight={3}
                      >
                        <AirlineSeatReclineNormalIcon />
                        <Box ml={1}>{car.seats}</Box>
                      </Box>
                      <Box display='flex' alignItems='center' lineHeight={3}>
                        <ColorLensIcon />
                        <Box ml={1}>{car.color}</Box>
                      </Box>
                    </div>
                  </CardContent>
                </CardActionArea>
                <div className={classes.cardEditInfo}>
                  {car.active ? (
                    <div style={{ color: 'white', fontWeight: 400 }}>
                      Active in rentals
                    </div>
                  ) : (
                    <Fragment>
                      <IconButton
                        color='inherit'
                        title='Delete car'
                        onClick={() => props.handleDelete(car._id, 'cars')}
                      >
                        <DeleteForeverIcon />
                      </IconButton>
                      <IconButton color='primary' title='Edit car'>
                        <EditIcon />
                      </IconButton>
                    </Fragment>
                  )}
                </div>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

CarCards.propTypes = {
  array: PropTypes.array.isRequired,
  handleModal: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default CarCards;
