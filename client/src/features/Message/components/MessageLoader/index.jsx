import React from 'react';
import PropTypes from 'prop-types';
import { Center, Spinner } from '@chakra-ui/react';

MessageLoader.propTypes = {
   loading: PropTypes.bool,
};

MessageLoader.defaultProps = {
   loading: false,
};

function MessageLoader({ loading, children }) {
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

export default MessageLoader;
