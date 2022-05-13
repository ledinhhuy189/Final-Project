import { Box } from '@chakra-ui/react';
import React from 'react';
import { useParams } from 'react-router-dom';
import CustomBreadcrumb from '../../../../global/components/CustomBreadcrumb';

const ProfilePage = () => {
   let { email } = useParams();

   return (
      <>
         <CustomBreadcrumb email={email} />
         <Box>
            <h1>This is Profile Page</h1>
         </Box>
      </>
   );
};

export default ProfilePage;
