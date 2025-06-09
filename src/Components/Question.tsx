import { FormControl,  OutlinedInput,  Typography } from "@mui/material";
import React from "react";

interface IProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export default function Question(props: IProps) {
  const [question, setQuestion] = React.useState(props.value || "");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value);
    if (props.onChange) {
      props.onChange(event.target.value);
    }
  };

  React.useEffect(() => {
    if (props.value) {
      setQuestion(props.value);
    }
  }, [props.value]);

  return (
    <FormControl fullWidth>
      <Typography variant="h6" component="h2" gutterBottom align="left"> 
        {props.label || "Question"}
      </Typography>
      <OutlinedInput
        id="question-input"
        fullWidth
        multiline
        rows={4}
        onChange={handleChange}
        value={question}
      />
    </FormControl>
  );
}
