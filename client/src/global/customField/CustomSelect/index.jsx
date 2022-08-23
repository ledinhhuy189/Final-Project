import {
   FormControl,
   FormErrorMessage,
   FormHelperText,
   FormLabel,
   Select,
} from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';

CustomSelect.propTypes = {
   field: PropTypes.object.isRequired,
   form: PropTypes.object.isRequired,
   label: PropTypes.string,
   placeholder: PropTypes.string,
   textHelper: PropTypes.string,
   disabled: PropTypes.bool,
   optionList: PropTypes.array.isRequired,
};

CustomSelect.defaultProps = {
   label: '',
   placeholder: '',
   textHelper: '',
   disabled: false,
};

function CustomSelect(props) {
   const { isSubmitting } = useFormikContext();

   const { field, form, placeholder, label, textHelper, disabled, optionList } =
      props;
   const { name } = field;
   const { errors, touched } = form;

   return (
      <FormControl id={name} isInvalid={errors[name] && touched[name]}>
         <FormLabel htmlFor={name}>{label}</FormLabel>
         <Select
            {...field}
            placeholder={placeholder}
            disabled={disabled || isSubmitting}
         >
            {optionList?.map((option) => (
               <option value={option.value} key={option.value}>
                  {option.label}
               </option>
            ))}
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
