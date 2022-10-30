import {
   Box,
   Flex,
   Image,
   Input,
   StackDivider,
   Switch,
   Text,
   useToast,
   VStack,
} from '@chakra-ui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import adminApi from '../../../../api/adminApi';
import CustomTable from '../../../../global/components/CustomTable';
import useDebounce from '../../../../hooks/useDebounce';

const AdminPage = () => {
   const navigate = useNavigate();
   const toast = useToast();
   const [searchValue, setSearchValue] = useState('');
   const searchInputDebounce = useDebounce(searchValue, 500);

   const {
      data: userListData,
      isLoading: isUserListDataLoading,
      refetch: refetchUserListData,
   } = useQuery(
      ['users', searchInputDebounce],
      async () =>
         await adminApi.getUserList({
            email: searchInputDebounce,
         }),
      {
         onError: (error) => {
            if (error.response.data.message === 'not_admin')
               return navigate('/');
         },
         retry: 0,
      }
   );

   const { mutate: adminMutate, isLoading: isAdminMutateLoading } = useMutation(
      async ({ email, isDeleted }) =>
         await adminApi.lockUser({ email, isDeleted }),
      {
         onSuccess: (response) => {
            refetchUserListData();
            toast({
               status: 'success',
               title: 'Lock',
               description: 'Lock user account successful',
               duration: 1000,
               position: 'top',
            });
         },
      }
   );

   const columns = useMemo(
      () => [
         {
            title: 'Id',
            dataIndex: ['id'],
            render: (value) => <Text>{value}</Text>,
         },
         {
            title: 'Image',
            dataIndex: ['photoURL'],
            render: (value) => (
               <Image
                  src={value}
                  w='50px'
                  h='50px'
                  objectFit='cover'
                  rounded='md'
               />
            ),
         },
         {
            title: 'Email',
            dataIndex: ['email'],
            render: (value) => <Text>{value}</Text>,
         },
         {
            title: 'Lock',
            render: (value) => (
               <Switch
                  size='md'
                  defaultChecked={Boolean(value.isDeleted)}
                  onChange={(e) =>
                     adminMutate({
                        email: value.email,
                        isDeleted: e.target.checked,
                     })
                  }
               />
            ),
         },
         {
            title: 'Lock at',
            dataIndex: ['isDeleted'],
            render: (value) => (
               <Text>
                  {value ? format(new Date(value), 'MM/dd/yyyy - HH:mm') : '-'}
               </Text>
            ),
         },
      ],
      [adminMutate]
   );

   const tableLoading = isAdminMutateLoading || isUserListDataLoading;

   return (
      <VStack bg='white' divider={<StackDivider />} py='4' gap='2'>
         <Flex w='full' px='4'>
            <Input
               value={searchValue}
               placeholder='Search by email'
               size='lg'
               onChange={(e) => setSearchValue(e.target.value)}
            />
         </Flex>
         <Box bg='white' w='full' rounded='xl' h='full'>
            <CustomTable
               columns={columns}
               data={userListData}
               isLoading={tableLoading}
            />
         </Box>
      </VStack>
   );
};

export default AdminPage;
