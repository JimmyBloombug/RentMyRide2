import React, { useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';

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
} from '@material-ui/core';

// Material UI Icons
import RoomIcon from '@material-ui/icons/Room';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import FastForwardIcon from '@material-ui/icons/FastForward';
import LocalGasStationIcon from '@material-ui/icons/LocalGasStation';
import AirlineSeatReclineNormalIcon from '@material-ui/icons/AirlineSeatReclineNormal';

// Context
import QueryContext from '../../context/query/queryContext';

// Define Style
const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '100vh',
    paddingTop: '64px',
    // paddingRight: theme.spacing(5),
    // paddingLeft: theme.spacing(5),
  },
  profile: {
    backgroundColor: theme.palette.background.paper,
  },
  media: {
    width: '100%',
    height: 400,
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

const Offers = (props) => {
  // ====== STYLE ======
  const classes = useStyles();

  // ====== CONTEXT =======
  const queryContext = useContext(QueryContext);
  const { rental, owner, getRentals, getOwner } = queryContext;

  // ====== FUNCTIONS =======

  // get rental id
  const id = props.location.search.split('=')[1];
  // get rental
  useEffect(() => {
    getRentals(id, 'public', 'single');
    // eslint-disable-next-line
  }, [id]);

  // get owner
  useEffect(() => {
    if (rental) {
      getOwner(rental.user_id);
    }
  }, [rental]);

  return (
    <div className={classes.container}>
      <Container maxWidth='lg'>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <div className={classes.profile}>
              <img src='' alt='' className={classes.img} />
            </div>
          </Grid>
          <Grid item xs={12} sm={8}>
            {rental !== undefined && (
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={rental.car.pictures[0]}
                    title={rental.car.label}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant='h5'
                      component='h2'
                      color='primary'
                    >
                      {rental.car.label}
                    </Typography>
                    <div>
                      <Box
                        display='flex'
                        alignItems='center'
                        mr={2}
                        lineHeight={3}
                      >
                        <AttachMoneyIcon />
                        <Box ml={1}>{rental.price + ' ' + rental.billing}</Box>
                      </Box>
                      <Box
                        display='flex'
                        alignItems='center'
                        mr={2}
                        lineHeight={3}
                      >
                        <RoomIcon />
                        <Box ml={1}>{rental.location.label}</Box>
                      </Box>
                      <Box
                        display='flex'
                        alignItems='center'
                        mr={2}
                        lineHeight={3}
                      >
                        <FastForwardIcon />
                        <Box ml={1}>{rental.car.kmDriven}</Box>
                      </Box>
                      <Box
                        display='flex'
                        alignItems='center'
                        mr={2}
                        lineHeight={3}
                      >
                        <LocalGasStationIcon />
                        <Box ml={1}>{rental.car.fueltype}</Box>
                      </Box>
                      <Box
                        display='flex'
                        alignItems='center'
                        mr={2}
                        lineHeight={3}
                      >
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
            )}
            {/* <div className={classes.offer}>

              </div> */}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default withRouter(Offers);
