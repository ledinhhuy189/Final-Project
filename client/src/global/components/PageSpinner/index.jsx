import { Center, Spinner } from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';

const PageSpinner = (props) => {
   const { children, isLoading } = props;

   return (
      <>
         {isLoading ? (
            <Center h='85vh'>
               <Spinner size='xl' emptyColor='gray.200' color='blue.500' />
            </Center>
         ) : (
            children
         )}
      </>
   );
};

PageSpinner.propTypes = {
   isLoading: PropTypes.bool,
};

PageSpinner.defaultProps = {
   isLoading: false,
};

export default PageSpinner;
