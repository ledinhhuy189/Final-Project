import {
   Accordion,
   AccordionButton,
   AccordionIcon,
   AccordionItem,
   AccordionPanel,
   AspectRatio,
   Avatar,
   Box,
   Center,
   Image,
   SimpleGrid,
   Text,
} from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';

MessageChatSidebar.propTypes = {
   senderInfo: PropTypes.object,
};

function MessageChatSidebar({ senderInfo }) {
   return (
      <Box w='full'>
         <Center flexDirection='column' gap='2' mb='3'>
            <Avatar size='lg' src={senderInfo?.photoURL} />
            <Text as='h1' fontWeight='bold' fontSize='lg'>
               {senderInfo?.name}
            </Text>
         </Center>
         <Accordion allowMultiple defaultIndex={[0]}>
            <AccordionItem>
               <h2>
                  <AccordionButton>
                     <Box flex='1' textAlign='left'>
                        Images
                     </Box>
                     <AccordionIcon />
                  </AccordionButton>
               </h2>
               <AccordionPanel pb={4}>
                  <SimpleGrid columns={2} spacing={2}>
                     <AspectRatio ratio={1} w='full'>
                        <Image
                           rounded='xl'
                           src='https://file.tinnhac.com/resize/600x-/2021/01/07/20210107120124-23fc.jpg'
                        />
                     </AspectRatio>
                     <AspectRatio ratio={1} w='full'>
                        <Image
                           rounded='xl'
                           src='https://bennettknowsdotcom.files.wordpress.com/2015/05/the-weeknd-hills.jpg'
                        />
                     </AspectRatio>
                     <AspectRatio ratio={1} w='full'>
                        <Image
                           rounded='xl'
                           src='https://bennettknowsdotcom.files.wordpress.com/2015/05/the-weeknd-hills.jpg'
                        />
                     </AspectRatio>
                     <AspectRatio ratio={1} w='full'>
                        <Image
                           rounded='xl'
                           src='https://file.tinnhac.com/resize/600x-/2021/01/07/20210107120124-23fc.jpg'
                        />
                     </AspectRatio>
                  </SimpleGrid>
               </AccordionPanel>
            </AccordionItem>
         </Accordion>
      </Box>
   );
}

export default MessageChatSidebar;
