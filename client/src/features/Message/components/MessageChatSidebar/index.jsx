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
import { getDownloadURL } from 'firebase/storage';
import PropTypes from 'prop-types';
import React, { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import listFiles from '../../../../firebase/listFiles';
import scrollbar from '../../../../global/styles/scrollbar';
import MessageLoader from '../MessageLoader';

MessageChatSidebar.propTypes = {
   senderInfo: PropTypes.object,
   handleOpenImageModal: PropTypes.func.isRequired,
   handleClickSenderInfo: PropTypes.func.isRequired,
};

function MessageChatSidebar({
   senderInfo,
   handleOpenImageModal,
   handleClickSenderInfo,
}) {
   const { conversationId } = useParams();

   const [imageList, setImageList] = useState([]);
   const [listLoading, setListLoading] = useState(true);

   useEffect(() => {
      setListLoading(true);
      listFiles(`messages/${conversationId}`, async (res) => {
         const promiseURL = res.items.map(async (folderRef) => {
            return await getDownloadURL(folderRef);
         });

         const result = await Promise.all(promiseURL);
         setImageList(result);
         setListLoading(false);
      });
   }, [conversationId]);

   return (
      <Box w='full'>
         <Center
            flexDirection='column'
            gap='2'
            mb='3'
            onClick={handleClickSenderInfo}
            cursor='pointer'
         >
            <Avatar size='lg' src={senderInfo?.photoURL} />
            <Text as='h1' fontWeight='bold' fontSize='lg'>
               {senderInfo?.name}
            </Text>
         </Center>
         <Accordion
            allowMultiple
            defaultIndex={[0]}
            maxH='68vh'
            overflow='auto'
            css={scrollbar}
         >
            <AccordionItem>
               <Text as='h2'>
                  <AccordionButton>
                     <Box flex='1' textAlign='left'>
                        Images
                     </Box>
                     <AccordionIcon />
                  </AccordionButton>
               </Text>
               <AccordionPanel pb={4}>
                  <SimpleGrid columns={2} spacing={2}>
                     <MessageLoader loading={listLoading}>
                        {imageList?.map((image, index) => (
                           <AspectRatio
                              ratio={1}
                              w='full'
                              key={index}
                              cursor='pointer'
                              onClick={() => handleOpenImageModal(image)}
                           >
                              <Image rounded='xl' src={image} />
                           </AspectRatio>
                        ))}
                        {imageList.length === 0 && !listLoading && (
                           <Text as='h2' color='gray.500'>
                              No Image
                           </Text>
                        )}
                     </MessageLoader>
                  </SimpleGrid>
               </AccordionPanel>
            </AccordionItem>
         </Accordion>
      </Box>
   );
}

export default memo(MessageChatSidebar);
