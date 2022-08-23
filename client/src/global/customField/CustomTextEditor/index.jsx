import {
   FormControl,
   FormErrorMessage,
   FormHelperText,
   FormLabel,
} from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import './styles.scss';

CustomTextEditor.propTypes = {
   field: PropTypes.object.isRequired,
   form: PropTypes.object.isRequired,
   label: PropTypes.string,
   placeholder: PropTypes.string,
   textHelper: PropTypes.string,
   disabled: PropTypes.bool,
};

CustomTextEditor.defaultProps = {
   label: '',
   placeholder: '',
   textHelper: '',
   disabled: false,
};

function CustomTextEditor(props) {
   const { isSubmitting } = useFormikContext();

   const { field, form, placeholder, label, textHelper, disabled } = props;
   const { name } = field;
   const { errors, touched } = form;

   const isInvalid = errors[name] && touched[name];
   const isShowHelperText = !isInvalid && textHelper;

   return (
      <FormControl
         id={name}
         isInvalid={isInvalid}
         className='customField__textEditor'
      >
         <FormLabel htmlFor={name}>{label}</FormLabel>
         <ReactQuill
            {...field}
            onChange={field.onChange(field.name)}
            onBlur={(range, source, quill) => field.onBlur(quill.getHTML())}
            style={{ width: '100%' }}
            placeholder={placeholder}
            readOnly={disabled || isSubmitting}
         />
         {isShowHelperText && <FormHelperText>{textHelper}</FormHelperText>}
         <FormErrorMessage>{errors[name]}</FormErrorMessage>
      </FormControl>
   );
}

export default CustomTextEditor;
