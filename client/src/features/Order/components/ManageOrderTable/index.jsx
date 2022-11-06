import {
   Avatar,
   Badge,
   Box,
   Divider,
   Flex,
   Heading,
   Icon,
   Select,
   Spacer,
   Text,
   VStack,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import React from 'react';
import { BsXCircleFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { ORDER_STATUS } from '../../../../constants/orderStatus';
import CustomTable from '../../../../global/components/CustomTable';
import priceFormat from '../../../../utils/priceFormat';

const ManageOrderTable = ({
   orderData,
   columns,
   userInfoHeader,
   isDisplaySelectStatus = false,
   onChangeOrderStatus,
}) => {
   const navigate = useNavigate();

   const onClickUserPrice = (email) => {
      navigate(`/profile/${email}`);
   };

   return (
      <VStack gap='6' w='full'>
         {orderData?.map((o) => (
            <Box key={o.id} w='full' borderWidth='2px' rounded='xl'>
               <Flex
                  px='20px'
                  py='20px'
                  borderBottomWidth='1px'
                  alignItems='center'
               >
                  <Flex
                     gap={4}
                     alignItems='center'
                     cursor='pointer'
                     onClick={() => onClickUserPrice(userInfoHeader(o).email)}
                  >
                     <Avatar src={userInfoHeader(o).avatar} />
                     <Text fontWeight='bold' fontSize='18px'>
                        {userInfoHeader(o).name}
                     </Text>
                  </Flex>
                  <Divider
                     orientation='vertical'
                     h='5'
                     borderColor='gray.500'
                     mx='4'
                  />
                  <Text>
                     {format(new Date(o.createdAt), 'dd/MM/yyyy HH:mm')}
                  </Text>
                  <Spacer />
                  <Box>
                     <Badge
                        colorScheme={
                           ORDER_STATUS[o.orderStatus.name].colorScheme
                        }
                        fontSize='16px'
                     >
                        {o.orderStatus.name} order
                     </Badge>
                  </Box>
               </Flex>
               <CustomTable
                  columns={columns}
                  data={o.orderItems}
                  disableThead={false}
               />

               <Flex
                  px='20px'
                  py='20px'
                  borderTopWidth='1px'
                  alignItems='center'
               >
                  {isDisplaySelectStatus && (
                     <Box>
                        <Select
                           placeholder='Select option'
                           defaultValue={o.orderStatus.id}
                           onChange={(e) =>
                              onChangeOrderStatus({
                                 orderId: o.id,
                                 orderStatusId: e.target.value,
                              })
                           }
                        >
                           {Object.keys(ORDER_STATUS).map((order) => (
                              <option
                                 value={ORDER_STATUS[order].id}
                                 key={order}
                              >
                                 {ORDER_STATUS[order].name}
                              </option>
                           ))}
                        </Select>
                     </Box>
                  )}

                  <Spacer />
                  <Text pr='2' fontSize='18px'>
                     Total price:
                  </Text>
                  <Heading as='h4' size='lg' color='red.400'>
                     {priceFormat(o.totalPrice)}
                  </Heading>
               </Flex>
            </Box>
         ))}

         {orderData.length === 0 && (
            <Box textAlign='center' py='5'>
               <Icon
                  as={BsXCircleFill}
                  color='gray.400'
                  fontSize='40px'
                  pb='2'
               />
               <Text fontSize='20px'>No Data</Text>
            </Box>
         )}
      </VStack>
   );
};

export default ManageOrderTable;
