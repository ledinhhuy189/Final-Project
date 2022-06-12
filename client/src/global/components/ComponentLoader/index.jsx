import React from 'react';
import PropTypes from 'prop-types';
import { Center, Spinner } from '@chakra-ui/react';

ComponentLoader.propTypes = {
   loading: PropTypes.bool,
};

ComponentLoader.defaultProps = {
   loading: false,
};

function ComponentLoader({ loading, children }) {
   return (
      <>
         {loading ? (
            <Center h='full' w='full'>
               <Spinner size='lg' emptyColor='gray.200' color='blue.500' />
            </Center>
         ) : (
            <>{children}</>
         )}
      </>
   );
}

export default ComponentLoader;
