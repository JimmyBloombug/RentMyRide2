import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

// Material UI
import {
  Modal,
  Button,
  Grid,
  Box,
  ButtonBase,
  makeStyles,
  useTheme,
  useMediaQuery,
  Typography,
} from '@material-ui/core';

// Material UI Icons
import CloseIcon from '@material-ui/icons/Close';

// Context
import NavbarContext from '../../context/navbar/navbarContext';

// Utils
import hexToRGB from '../../utils/hexToRGB';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    outline: 'none',
  },
  cont: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3, 4, 3),
    borderRadius: '10px',
    outline: 'none',
  },
  closeButton: {
    position: 'absolute',
    right: '0px',
    top: '10px',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  h3: {
    fontWeight: '600',
    marginTop: theme.spacing(3),
  },
  web: {
    width: '60vw',
  },
  mobile: {
    width: '100vw',
  },
  messagesWrapper: {
    marginTop: '16px',
  },
  chatButton: {
    borderRadius: 10,
    width: '100%',
    padding: theme.spacing(1, 1),
  },
  profileImg: {
    width: 40,
    hheight: 40,
    marginRight: 10,
  },
  profileName: {
    fontSize: '1.4em',
    fontWeight: 600,
  },
  contentCont: {
    height: 400,
    overflow: 'scroll',
  },
  messages: {
    width: '60%',
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    borderRadius: 10,
    backgroundColor: hexToRGB(theme.palette.primary.dark, 0.4),
  },
}));

const Messages = () => {
  // ===== STYLE =====
  // Theme
  const theme = useTheme();

  // Media Queries
  let sup = useMediaQuery(theme.breakpoints.up('sm'));

  // Classes
  const classes = useStyles();

  // ===== CONTEXT =======
  const navbarContext = useContext(NavbarContext);
  const { messagesOpen, setMessagesMenu } = navbarContext;

  // ===== FUNCTIONS ======
  const handleClose = () => {
    setMessagesMenu({ open: false, message: '' });
  };

  return (
    <Modal
      open={messagesOpen.open}
      onClose={handleClose}
      aria-labelledby='profile-form'
      className={classes.modal}
    >
      <motion.div
        transition={{
          delay: 0.2,
          duration: 0.3,
          type: 'spring',
          damping: 10,
          stiffness: 100,
        }}
        initial={{ y: '100vh' }}
        animate={{ y: 0 }}
        className={classes.modal}
      >
        <div className={clsx(classes.cont, sup ? classes.web : classes.mobile)}>
          <Button className={classes.closeButton} onClick={handleClose}>
            <CloseIcon />
          </Button>
          <h3 className={classes.h3}>Messages</h3>
          <Grid container spacing={2} className={classes.messagesWrapper}>
            <Grid item xs={12} sm={3} className={classes.contentCont}>
              <ButtonBase className={classes.chatButton}>
                <Box display='flex' alignItems='center'>
                  <img
                    src='public/default/profile/profile.svg'
                    alt=''
                    className={classes.profileImg}
                  />
                  <div className={classes.profileName}>John Doe</div>
                </Box>
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm={9} className={classes.contentCont}>
              <div className={classes.messages}>diocncmo</div>
              <div className={classes.messages}>diocncmo</div>
              <div className={classes.messages}>diocncmo</div>
              <div className={classes.messages}>diocncmo</div>
              <div className={classes.messages}>diocncmo</div>
              <div className={classes.messages}>diocncmo</div>
              <div className={classes.messages}>diocncmo</div>
              <div className={classes.messages}>diocncmo</div>
              <div className={classes.messages}>diocncmo</div>
              <div className={classes.messages}>diocncmo</div>
              <div className={classes.messages}>diocncmo</div>
              <div className={classes.messages}>diocncmo</div>
              <div className={classes.messages}>diocncmo</div>
              <div className={classes.messages}>diocncmo</div>
              <div className={classes.messages}>diocncmo</div>
              <div className={classes.messages}>diocncmo</div>
              <div className={classes.messages}>diocncmo</div>
              <div className={classes.messages}>diocncmo</div>
              <div className={classes.messages}>diocncmo</div>
              <div className={classes.messages}>diocncmo</div>
            </Grid>
          </Grid>
        </div>
      </motion.div>
    </Modal>
  );
};

export default Messages;
