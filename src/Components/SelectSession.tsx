import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import type { SelectChangeEvent } from "@mui/material/Select";
import { sessionData } from "../data/sessionData.ts";

interface IProps {
    value?: string;
    onChange?: (value: string) => void;
}

export default function SelectSession(props: IProps) {
  const [sessionNum, setSessionNum] = React.useState(props.value || "1");

  const handleChange = (event: SelectChangeEvent) => {
    setSessionNum(event.target.value as string);
    if (props.onChange) {
      props.onChange(event.target.value as string);
    }
  };

  React.useEffect(() => {
    if (props.value) {
      setSessionNum(props.value);
    }
  }, [props.value]);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="session-select-label">Session</InputLabel>
        <Select
          labelId="session-select-label"
          id="session-select"
          value={sessionNum}
          label="Session"
          onChange={handleChange}
        >
          {sessionData.map(session => (
            <MenuItem key={`s-${session.value}`} value={session.value}>
              {`Session ${session.value}: ${session.label} (${session.verses})`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
