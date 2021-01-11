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
} from '@material-ui/core';

// Material UI Icons
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import RoomIcon from '@material-ui/icons/Room';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import BlockIcon from '@material-ui/icons/Block';
import ChatIcon from '@material-ui/icons/Chat';

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
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 50,
    backgroundColor: hexToRGB(theme.palette.primary.main, 0.2),
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

const RentalCards = (props) => {
  // ====== STYLE ======
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            className={clsx(classes.card, classes.addNew)}
            onClick={() => props.handleModal({ open: true, type: 'rentals' })}
          >
            <CardActionArea>
              <CardContent className={clsx(classes.cont, classes.addNewCont)}>
                <AddIcon className={classes.addIcon} />
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        {props.array.map((rental, index) => {
          return (
            <Grid item xs={12} sm={6} md={3} key={rental._id}>
              <Card className={classes.card}>
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
                        <BookmarkIcon />
                        <Box ml={1}>
                          {rental.booked === true ? 'booked' : 'not booked'}
                        </Box>
                      </Box>
                    </div>
                  </CardContent>
                </CardActionArea>
                <div className={classes.cardEditInfo}>
                  {rental.booked === false ? (
                    <Fragment>
                      <IconButton
                        color='inherit'
                        title='Delete rental offer'
                        onClick={() =>
                          props.handleDelete(rental._id, 'rentals')
                        }
                      >
                        <DeleteForeverIcon />
                      </IconButton>
                      <IconButton color='primary' title='Edit rental offer'>
                        <EditIcon />
                      </IconButton>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <IconButton color='inherit' title='Close offer'>
                        <BlockIcon />
                      </IconButton>
                      <IconButton color='primary' title='Message customer'>
                        <ChatIcon />
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

RentalCards.propTypes = {
  array: PropTypes.array.isRequired,
  handleModal: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default RentalCards;
