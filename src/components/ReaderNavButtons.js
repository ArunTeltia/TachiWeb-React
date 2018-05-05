import React from 'react';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';

const ReaderNavButtons = ({ onPrevPageClick, onNextPageClick }) => {
  const button = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 1,
  };

  return (
    <React.Fragment>
      <IconButton onClick={onPrevPageClick} style={button}>
        <Icon>navigate_before</Icon>
      </IconButton>
      <IconButton onClick={onNextPageClick} style={{ ...button, right: 0 }}>
        <Icon>navigate_next</Icon>
      </IconButton>
    </React.Fragment>
  );
};

export default ReaderNavButtons;