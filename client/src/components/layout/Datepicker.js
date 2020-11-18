import React, { Fragment, useState } from 'react';
import 'moment';
import MomentUtils from '@date-io/moment';

// Material UI
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const Datepicker = () => {
  const [selectedDate, setDateFrom] = useState();

  return (
    <Fragment>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <KeyboardDatePicker
          margin='normal'
          id='dateFrom'
          label='From'
          value={selectedDate}
          format='MM/DD/yyyy'
          inputVariant='outlined'
          onChange={(date) => setDateFrom(date)}
          autoOk
          disablePast
          KeyboardButtonProps={{
            'aria-label': 'Change date',
          }}
        />
      </MuiPickersUtilsProvider>
    </Fragment>
  );
};

export default Datepicker;
