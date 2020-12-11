import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

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
  Container,
  IconButton,
} from '@material-ui/core';

// Material UI Icons
import EditIcon from '@material-ui/icons/Edit';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import FastForwardIcon from '@material-ui/icons/FastForward';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import LocalGasStationIcon from '@material-ui/icons/LocalGasStation';
import AirlineSeatReclineNormalIcon from '@material-ui/icons/AirlineSeatReclineNormal';

// Style
const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(0, 4),
  },
  card: {
    height: 480,
    position: 'relative',
  },
  media: {
    height: 200,
  },
  cont: {
    height: 480,
  },
  carName: {
    height: 80,
  },
  attributes: {
    color: '#b9babd',
    fontWeight: 500,
  },
  attributesMargin: {
    marginRight: 10,
  },
  edit: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.5,
    top: '50%',
    left: '50%',
    backgroundColor: 'black',
  },
  cardEditInfo: {
    zIndex: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(0,0,0,.5)',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    fontSize: '1.3em',
    fontWeight: 500,
    color: '#DD3D31',
  },
}));

const CarCards = (props) => {
  // ====== STYLE ======
  const classes = useStyles();

  // ===== FUNCTIONS ======
  const actionStatesArray = [];
  for (let i = 0; i < props.array.length; i++) {
    let stateObject = { index: i, open: false };
    actionStatesArray.push(stateObject);
  }
  // States
  const [actionFields, setActionField] = useState(actionStatesArray);

  const handleMouseEnter = (index) => {
    // copy items
    let items = [...actionFields];
    // copy item
    let item = { ...items[index] };
    // open
    item.open = true;
    items[index] = item;
    setActionField(items);
  };

  const handleMouseLeave = (index) => {
    // copy items
    let items = [...actionFields];
    // copy item
    let item = { ...items[index] };
    // open
    item.open = false;
    items[index] = item;
    setActionField(items);
  };

  return props.type === 'cars' ? (
    <div className={classes.container}>
      <Container maxWidth='lg'>
        <Grid container spacing={2}>
          {props.array.map((car, index) => {
            return (
              <Grid item xs={12} sm={6} md={3}>
                <Card
                  className={classes.card}
                  key={car._id}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                >
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={car.pictures[0]}
                      title={car.brand + ' ' + car.model + ' ' + car.year}
                    />
                    <CardContent className={classes.cont}>
                      <Typography
                        gutterBottom
                        variant='h5'
                        component='h2'
                        className={classes.carName}
                        color='primary'
                      >
                        {car.brand + ' ' + car.model + ' ' + car.year}
                      </Typography>
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          fontSize: '1.3em',
                          fontWeight: 600,
                          position: 'relative',
                        }}
                      >
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
                  <motion.div
                    transition={{
                      duration: 0.5,
                      type: 'tween',
                      damping: 10,
                      stiffness: 50,
                    }}
                    initial={{ y: 50 }}
                    animate={{ y: actionFields[index].open === true ? 0 : 50 }}
                    className={classes.cardEditInfo}
                  >
                    <IconButton color='inherit'>
                      <DeleteForeverIcon />
                    </IconButton>
                    <IconButton color='primary'>
                      <EditIcon />
                    </IconButton>
                  </motion.div>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  ) : (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image='/static/images/cards/contemplative-reptile.jpg'
          title='Contemplative Reptile'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            Lizard
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

CarCards.propTypes = {
  type: PropTypes.string.isRequired,
  array: PropTypes.array.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default CarCards;
