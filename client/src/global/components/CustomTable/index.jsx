import React from 'react';
import Table from 'rc-table';
import { Box } from '@chakra-ui/react';
import './CustomTable.scss';

function CustomTable({ columns, data, disableThead }) {
   return (
      <Box
         w='full'
         className={`custom-table ${disableThead && 'disabled--thead'}`}
      >
         <Table
            columns={columns}
            data={data}
            tableLayout='auto'
            rowKey={(record) => record.id}
         />
      </Box>
   );
}

export default CustomTable;
