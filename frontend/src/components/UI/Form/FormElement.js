import React from 'react';
import PropTypes from 'prop-types';
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FileInput from "./FileInput";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Chip from "@material-ui/core/Chip";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";


const FormElement = props => {
  let inputChildren = undefined;

  if (props.type === 'select') {
    inputChildren = props.options.map(o => (
        <MenuItem key={o._id} value={o._id}>
        {o.title || o.role}
      </MenuItem>
    ));
  }

  let inputComponent = (
    <TextField
      fullWidth
      variant="outlined"
      label={props.title}
      error={!!props.error}
      type={props.type}
      select={props.type === 'select'}
      name={props.propertyName} id={props.propertyName}
      value={props.value}
      onChange={props.onChange}
      required={props.required}
      autoComplete={props.autoComplete}
      placeholder={props.placeholder}
      children={inputChildren}
      helperText={props.error}
      style={props.style}
    >
      {inputChildren}
    </TextField>
  );



  if (props.type === 'file') {
    inputComponent = (
      <FileInput
        label={props.title}
        name={props.propertyName}
        onChange={props.onChange}
      />
    )
  }

  if (props.type === 'tags') {
    inputComponent = (
      <Autocomplete
        multiple
        options={props.tags}
        onChange={props.onChange}
        value={props.value}
        freeSolo
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField {...params} variant="outlined" label={props.title} />
        )}
      />
    )
  }

  return inputComponent;


};


FormElement.propTypes = {
  propertyName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
  options: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  autoComplete: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string)
};

export default FormElement;