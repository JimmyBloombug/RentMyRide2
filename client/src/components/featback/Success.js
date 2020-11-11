import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// Import Success Gif
import successGif from '../../assets/featback/success.gif';

// ======= MODUL RETURNS ========

const Success = (props) => {
  return (
    <Fragment>
      <img
        src={successGif}
        className={props.classes.successGif}
        alt='loading'
      />
    </Fragment>
  );
};

Success.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default Success;
