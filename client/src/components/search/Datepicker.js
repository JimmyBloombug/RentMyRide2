import React, { useState } from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

// Material UI
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from '@material-ui/pickers';

const Datepicker = () => {
  const [selectedDate, setSelectedDate] = useState();

  const handleDateChange = (date, value) => {
    setSelectedDate(value);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDateTimePicker
        autoOk
        ampm={false}
        variant='inline'
        inputVariant='outlined'
        disablePast
        format='MM/dd/yyyy HH:mm'
        margin='normal'
        id='date-picker'
        label='Check In'
        value={selectedDate}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          'aria-label': 'Check in day',
        }}
      />
    </MuiPickersUtilsProvider>
  );
};

export default Datepicker;
