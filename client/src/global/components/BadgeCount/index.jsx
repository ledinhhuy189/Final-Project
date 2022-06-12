import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '@chakra-ui/react';

BadgeCount.propTypes = {
   number: PropTypes.number,
};

BadgeCount.defaultProps = {
   number: 0,
};

function BadgeCount({ number }) {
   return (
      <Text
         as='span'
         lineHeight='1'
         fontSize='10px'
         position='absolute'
         top='20%'
         left='100%'
         zIndex='1'
         color='white'
         fontWeight='bold'
         borderWidth='0'
         transform='auto'
         translateX='-50%'
         translateY='-50%'
         _after={{
            content: '""',
            w: '15px',
            h: '15px',
            bg: 'red.500',
            rounded: 'full',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'auto',
            translateX: '-50%',
            translateY: '-50%',
            zIndex: -1,
         }}
      >
         {number}
      </Text>
   );
}

export default BadgeCount;
