import { Container } from '@chakra-ui/react';
import React from 'react';

const ContentContainer = (props) => {
   const { children } = props;

   return (
      <Container maxW='1400px' mt='4' minH='90vh'>
         {children}
      </Container>
   );
};

export default ContentContainer;
