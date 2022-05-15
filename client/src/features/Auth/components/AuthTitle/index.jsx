import React from 'react';
import PropTypes from 'prop-types';
import { Text, VStack } from '@chakra-ui/react';

AuthTitle.propTypes = {
   title: PropTypes.string,
   subTitle: PropTypes.string,
};

AuthTitle.defaultProps = {
   title: '',
   subTitle: '',
};

function AuthTitle(props) {
   const { title, subTitle } = props;

   return (
      <VStack minW='400px' justifyContent='start' alignItems='start' mb='30px'>
         <Text fontSize='35px' fontWeight='bold'>
            {title}
         </Text>
         <Text color='gray.600'>{subTitle}</Text>
      </VStack>
   );
}

export default AuthTitle;
