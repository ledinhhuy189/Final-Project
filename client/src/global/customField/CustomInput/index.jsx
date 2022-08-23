import {
   FormControl,
   FormErrorMessage,
   FormHelperText,
   FormLabel,
   Input,
} from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';

CustomInput.propTypes = {
   field: PropTypes.object.isRequired,
   form: PropTypes.object.isRequired,
   type: PropTypes.string,
   label: PropTypes.string,
   placeholder: PropTypes.string,
   textHelper: PropTypes.string,
   disabled: PropTypes.bool,
};

CustomInput.defaultProps = {
   type: 'text',
   label: '',
   placeholder: '',
   textHelper: '',
   disabled: false,
};

function CustomInput(props) {
   const { isSubmitting } = useFormikContext();

   const { field, form, placeholder, label, type, textHelper, disabled } =
      props;
   const { name } = field;
   const { errors, touched } = form;

   const isInvalid = errors[name] && touched[name];
   const isShowHelperText = !isInvalid && textHelper;

   return (
      <FormControl id={name} isInvalid={isInvalid}>
         <FormLabel htmlFor={name}>{label}</FormLabel>
         <Input
            {...field}
            placeholder={placeholder}
            type={type}
            disabled={disabled || isSubmitting}
         />
         {isShowHelperText && <FormHelperText>{textHelper}</FormHelperText>}
         <FormErrorMessage>{errors[name]}</FormErrorMessage>
      </FormControl>
   );
}

export default CustomInput;
