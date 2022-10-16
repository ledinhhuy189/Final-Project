import { Container } from '@chakra-ui/react';
import React from 'react';

const ContentContainer = (props) => {
   const { children } = props;

   return (
      <Container maxW='1400px' mt='4' mb='4' minH='88vh'>
         {children}
      </Container>
   );
};

export default ContentContainer;
