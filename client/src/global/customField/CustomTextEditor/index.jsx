import {
   FormControl,
   FormErrorMessage,
   FormHelperText,
   FormLabel,
} from '@chakra-ui/react';
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
};

CustomTextEditor.defaultProps = {
   label: '',
   placeholder: '',
   textHelper: '',
};

function CustomTextEditor(props) {
   const { field, form, placeholder, label, textHelper } = props;
   const { name } = field;
   const { errors, touched } = form;

   return (
      <FormControl
         id={name}
         isInvalid={errors[name] && touched[name]}
         className='customField__textEditor'
      >
         <FormLabel htmlFor={name}>{label}</FormLabel>
         <ReactQuill
            {...field}
            onChange={field.onChange(field.name)}
            onBlur={(range, source, quill) => field.onBlur(quill.getHTML())}
            style={{ width: '100%' }}
            placeholder={placeholder}
         />
         {errors && errors[name] ? (
            <FormErrorMessage>{errors[name]}</FormErrorMessage>
         ) : (
            textHelper && <FormHelperText>{textHelper}</FormHelperText>
         )}
      </FormControl>
   );
}

export default CustomTextEditor;
