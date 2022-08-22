import {
   FormControl,
   FormErrorMessage,
   FormHelperText,
   FormLabel,
   Input,
} from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';

CustomInput.propTypes = {
   field: PropTypes.object.isRequired,
   form: PropTypes.object.isRequired,
   type: PropTypes.string,
   label: PropTypes.string,
   placeholder: PropTypes.string,
   textHelper: PropTypes.string,
};

CustomInput.defaultProps = {
   type: 'text',
   label: '',
   placeholder: '',
   textHelper: '',
};

function CustomInput(props) {
   const { field, form, placeholder, label, type, textHelper } = props;
   const { name } = field;
   const { errors, touched } = form;

   return (
      <FormControl id={name} isInvalid={errors[name] && touched[name]}>
         <FormLabel htmlFor={name}>{label}</FormLabel>
         <Input {...field} placeholder={placeholder} type={type} />
         {errors && errors[name] ? (
            <FormErrorMessage>{errors[name]}</FormErrorMessage>
         ) : (
            textHelper && <FormHelperText>{textHelper}</FormHelperText>
         )}
      </FormControl>
   );
}

export default CustomInput;
