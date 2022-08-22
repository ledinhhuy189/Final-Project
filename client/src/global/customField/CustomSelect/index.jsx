import {
   FormControl,
   FormErrorMessage,
   FormHelperText,
   FormLabel,
   Select,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';

CustomSelect.propTypes = {
   field: PropTypes.object.isRequired,
   form: PropTypes.object.isRequired,
   type: PropTypes.string,
   label: PropTypes.string,
   placeholder: PropTypes.string,
   textHelper: PropTypes.string,
};

CustomSelect.defaultProps = {
   type: 'text',
   label: '',
   placeholder: '',
   textHelper: '',
};

function CustomSelect(props) {
   const { field, form, placeholder, label, type, textHelper } = props;
   const { name } = field;
   const { errors, touched } = form;

   return (
      <FormControl id={name} isInvalid={errors[name] && touched[name]}>
         <FormLabel htmlFor={name}>{label}</FormLabel>
         <Select {...field} placeholder={placeholder}>
            <option value='option1'>Option 1</option>
            <option value='option2'>Option 2</option>
            <option value='option3'>Option 3</option>
         </Select>
         {errors && errors[name] ? (
            <FormErrorMessage>{errors[name]}</FormErrorMessage>
         ) : (
            textHelper && <FormHelperText>{textHelper}</FormHelperText>
         )}
      </FormControl>
   );
}

export default CustomSelect;
