import { Box, List, ListIcon, ListItem, Text } from '@chakra-ui/react';
import React from 'react';
import { BsInboxFill } from 'react-icons/bs';
import { IoFastFoodSharp } from 'react-icons/io5';

const Sidebar = ({ onClickSidebarManageItem, selectedSidebarItem }) => {
   const highLightListItem = (item) =>
      item === selectedSidebarItem && {
         bg: 'gray.100',
      };

   return (
      <Box>
         <List spacing={0}>
            <ListItem
               display='flex'
               gap='2'
               alignItems='center'
               cursor='pointer'
               onClick={() => onClickSidebarManageItem('food')}
               px='25px'
               py='18px'
               {...highLightListItem('food')}
            >
               <ListIcon
                  as={IoFastFoodSharp}
                  color='green.600'
                  fontSize='25px'
               />
               <Text fontSize='18px'>Food</Text>
            </ListItem>
            <ListItem
               display='flex'
               alignItems='center'
               gap='2'
               cursor='pointer'
               onClick={() => onClickSidebarManageItem('order')}
               px='25px'
               py='18px'
               {...highLightListItem('order')}
            >
               <ListIcon as={BsInboxFill} color='green.600' fontSize='25px' />
               <Text fontSize='18px'>Order</Text>
            </ListItem>
         </List>
      </Box>
   );
};

export default Sidebar;
