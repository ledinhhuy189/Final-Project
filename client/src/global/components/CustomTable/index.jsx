import { Box, Center, Spinner, Text } from '@chakra-ui/react';
import Table from 'rc-table';
import React, { memo } from 'react';
import './CustomTable.scss';

function CustomTable({ columns, data, disableThead, isLoading = false }) {
   return (
      <Box
         w='full'
         position='relative'
         className={`custom-table ${disableThead && 'disabled--thead'}`}
      >
         {isLoading && (
            <Box
               position='absolute'
               w='full'
               h='full'
               bg='gray.200'
               opacity={0.6}
               zIndex={10}
               rounded='xl'
            >
               <Center h='full' flexDirection='column' gap='4'>
                  <Spinner />
                  <Text fontWeight='bold' fontSize='20px'>
                     Loading
                  </Text>
               </Center>
            </Box>
         )}

         <Table
            columns={columns}
            data={data}
            tableLayout='auto'
            rowKey={(record) => record.id}
         />
      </Box>
   );
}

export default memo(CustomTable);
