import { Box, Flex } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import CustomBreadcrumb from '../../../../global/components/CustomBreadcrumb';
import InformationForm from '../../components/InfomationForm';
import YourOrder from '../../components/YourOrder';

function OrderPage(props) {
   const { state: orderItemsData } = useLocation();

   return (
      <>
         <Box mb='4'>
            <CustomBreadcrumb />
         </Box>
         <Box py='6' px='8' bg='white' shadow='md' rounded='2xl'>
            <Flex w='full' gap='14'>
               <Box flex='3'>
                  <InformationForm />
               </Box>
               <Box flex='2'>
                  <YourOrder orderItemsData={orderItemsData} />
               </Box>
            </Flex>
         </Box>
      </>
   );
}

export default OrderPage;
