import React from 'react';
import PropTypes from 'prop-types';

// Material UI
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
  Grid,
  Container,
} from '@material-ui/core';

// Style
const useStyles = makeStyles((theme) => ({
  card: {
    height: 500,
  },
  media: {
    height: 200,
  },
  cont: {
    height: 100,
    textAlign: 'center',
  },
}));

const CarCards = (props) => {
  // ====== STYLE ======
  const classes = useStyles();

  // ===== FUNCTIONS ======

  return props.type === 'cars' ? (
    <Container maxWidth='lg'>
      <Grid container spacing={2}>
        {props.array.map((car) => {
          return (
            <Grid item xs={12} sm={6} md={3}>
              <Card className={classes.card} key={car._id}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={car.pictures[0]}
                    title={car.brand + ' ' + car.model + ' ' + car.year}
                  />
                  <CardContent className={classes.cont}>
                    <Typography gutterBottom variant='h5' component='h2'>
                      {car.brand + ' ' + car.model + ' ' + car.year}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
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
