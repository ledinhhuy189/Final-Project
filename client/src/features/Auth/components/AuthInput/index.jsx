import {
   FormControl,
   FormErrorMessage,
   FormLabel,
   Input,
} from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';

AuthInput.propTypes = {
   field: PropTypes.object.isRequired,
   form: PropTypes.object.isRequired,
   type: PropTypes.string,
   label: PropTypes.string,
   placeholder: PropTypes.string,
};

AuthInput.defaultProps = {
   type: 'text',
   label: '',
   placeholder: '',
};

function AuthInput(props) {
   const { field, form, placeholder, label, type } = props;
   const { name } = field;
   const { errors, touched } = form;

   return (
      <FormControl id={name} isInvalid={errors[name] && touched[name]}>
         <FormLabel htmlFor={name}>{label}</FormLabel>
         <Input {...field} placeholder={placeholder} type={type} />
         <FormErrorMessage>{errors[name]}</FormErrorMessage>
      </FormControl>
   );
}

export default AuthInput;
