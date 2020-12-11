import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
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
  Container,
  IconButton,
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

// Style
const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(0, 4),
  },
  card: {
    height: 460,
    position: 'relative',
  },
  media: {
    height: 200,
  },
  cont: {
    height: 460,
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
  cardEditInfo: {
    zIndex: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 50,
    backgroundColor: hexToRGB('#171719', 0.9),
    display: 'flex',
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

  // ===== FUNCTIONS ======
  const actionStatesArray = [];
  for (let i = 0; i < props.array.length; i++) {
    let stateObject = { index: i, open: false };
    actionStatesArray.push(stateObject);
  }
  // States
  const [actionFields, setActionField] = useState(actionStatesArray);

  const handleClick = (index) => {
    if (actionFields[index].open === false) {
      // copy items
      let items = [...actionFields];
      // copy item
      let item = { ...items[index] };
      // open actionfield
      item.open = true;
      items[index] = item;
      setActionField(items);
    } else {
      // copy items
      let items = [...actionFields];
      // copy item
      let item = { ...items[index] };
      // close actionfield
      item.open = false;
      items[index] = item;
      setActionField(items);
    }
  };

  const handleModal = () => {};

  return (
    <div className={classes.container}>
      <Container maxWidth='lg'>
        <Grid container spacing={2}>
          {props.array.map((car, index) => {
            return (
              <Grid item xs={12} sm={6} md={3} key={car._id}>
                <Card
                  className={classes.card}
                  onClick={() => handleClick(index)}
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
        </Grid>
      </Container>
    </div>
  );
};

CarCards.propTypes = {
  array: PropTypes.array.isRequired,
};

export default CarCards;
