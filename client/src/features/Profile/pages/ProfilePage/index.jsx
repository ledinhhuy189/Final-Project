import { Box, Center, Grid, GridItem, Spinner } from '@chakra-ui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import authApi from '../../../../api/authApi';
import conversationApi from '../../../../api/conversationApi';
import CustomBreadcrumb from '../../../../global/components/CustomBreadcrumb';
import ProfileFoodList from '../../components/ProfileFoodList';
import ProfileHeader from '../../components/ProfileHeader';

const ProfilePage = () => {
   const navigate = useNavigate();
   const { email } = useParams();

   const { data: userProfileData, isLoading: isUserProfileLoading } = useQuery(
      ['userProfile', { email }],
      async () => await authApi.getUser({ email })
   );

   const { mutate: createConversationMutation } = useMutation(
      async () =>
         await conversationApi.createConversation({
            userId: userProfileData.id,
         }),
      {
         onSuccess: (response) =>
            navigate(`/message/${response.conversationId}`),
      }
   );

   return (
      <>
         {isUserProfileLoading ? (
            <Center>
               <Spinner />
            </Center>
         ) : (
            <>
               <CustomBreadcrumb email={email} />
               <Box pt={10}>
                  <Grid templateColumns='repeat(4, 1fr)' gap={8} w='full'>
                     <GridItem colSpan='3' w='full'>
                        <ProfileFoodList data={userProfileData.foods} />
                     </GridItem>
                     <GridItem
                        colSpan='1'
                        w='full'
                        bg='white'
                        rounded='xl'
                        shadow='md'
                        h='fit-content'
                     >
                        <Box p={8}>
                           <ProfileHeader
                              data={userProfileData}
                              onClickMessage={createConversationMutation}
                           />
                        </Box>
                     </GridItem>
                  </Grid>
               </Box>
            </>
         )}
      </>
   );
};

export default ProfilePage;
