import React from "react";
import PropTypes from "prop-types";

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
} from "@material-ui/core";

// Material UI Icons
// import AddIcon from "@material-ui/icons/Add";
// import EditIcon from "@material-ui/icons/Edit";
// import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import RoomIcon from "@material-ui/icons/Room";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
// import BlockIcon from "@material-ui/icons/Block";
import ChatIcon from "@material-ui/icons/Chat";

// Utils
import hexToRGB from "../../utils/hexToRGB";
import { Fragment } from "react";

// Style
const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(0, 4),
  },
  card: {
    height: 500,
    position: "relative",
  },
  media: {
    height: 200,
  },
  cont: {
    height: 500,
  },
  info: {
    display: "flex",
    flexWrap: "wrap",
    fontSize: "1.2em",
    fontWeight: 600,
    position: "relative",
  },
  carName: {
    height: 80,
    display: "flex",
    alignItems: "center",
  },
  attributes: {
    color: "#b9babd",
    fontWeight: 500,
  },
  attributesMargin: {
    marginRight: 10,
  },
  cardEditInfo: {
    zIndex: 1,
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: 50,
    backgroundColor: hexToRGB(theme.palette.primary.main, 0.2),
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    fontSize: "1.3em",
    fontWeight: 500,
    color: "#DD3D31",
  },
  addNew: {
    // background: "rgb(61,108,125)",
    background:
      "linear-gradient(12deg, rgba(61,108,125,1) 0%, rgba(17,39,47,1) 100%)",
  },
  addNewCont: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  addIcon: {
    width: 50,
    height: 50,
  },
}));

const BookingCards = (props) => {
  // ====== STYLE ======
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Grid container spacing={2}>
        {props.array.map((booking, index) => {
          return (
            <Grid item xs={12} sm={6} md={3} key={booking._id}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={booking.car.pictures[0]}
                    title={booking.car.label}
                  />
                  <CardContent className={classes.cont}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      className={classes.carName}
                      color="primary"
                    >
                      {booking.car.label}
                    </Typography>
                    <div className={classes.info}>
                      <Box
                        display="flex"
                        alignItems="center"
                        mr={2}
                        lineHeight={3}
                      >
                        <AttachMoneyIcon />
                        <Box ml={1}>
                          {booking.price + " " + booking.billing}
                        </Box>
                      </Box>
                      <Box
                        display="flex"
                        alignItems="center"
                        mr={2}
                        lineHeight={3}
                      >
                        <RoomIcon />
                        <Box ml={1}>{booking.location.label}</Box>
                      </Box>
                      <Box
                        display="flex"
                        alignItems="center"
                        mr={2}
                        lineHeight={3}
                      >
                        <BookmarkIcon />
                      </Box>
                    </div>
                  </CardContent>
                </CardActionArea>
                <div className={classes.cardEditInfo}>
                  <Fragment>
                    <IconButton color="primary" title="Message customer">
                      <ChatIcon />
                    </IconButton>
                  </Fragment>
                </div>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

BookingCards.propTypes = {
  array: PropTypes.array.isRequired,
  handleModal: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default BookingCards;
