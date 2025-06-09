import * as React from 'react';
import { DateTime } from 'luxon';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface IProps {
  value?: Date | null;
  onChange?: (newValue: Date | null) => void;
}

export default function ChooseDate(props: IProps) {
  const [value, setValue] = React.useState<DateTime | null>(null);

React.useEffect(() => {
    if (props.value) {
        setValue(DateTime.fromJSDate(props.value));
    } else {
        setValue(null);
    }
}, [props.value]);

  const handleChange = (newValue: DateTime | null) => {
    setValue(newValue);
    if (props.onChange) {
      props.onChange(newValue ? newValue.toJSDate() : null);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker value={value} onChange={handleChange} />
      </DemoContainer>
    </LocalizationProvider>
  );
}
