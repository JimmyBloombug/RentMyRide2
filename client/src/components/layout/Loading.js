import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// Loading Gif
import loadingGif from '../../assets/featback/loading.gif';

const Loading = (props) => {
  return (
    <Fragment>
      <img src={loadingGif} className={props.classes} alt='loading' />
    </Fragment>
  );
};

Loading.propTypes = {
  classes: PropTypes.string.isRequired,
};

export default Loading;
