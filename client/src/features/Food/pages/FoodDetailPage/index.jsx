import { Box, Grid, GridItem, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import cartApi from '../../../../api/cartApi';
import foodApi from '../../../../api/foodApi';

import { authCartId } from '../../../Auth/authSlice';
import { cartActions } from '../../../Cart/cartSlice';

import { GRID_GAP } from '../../../../constants/productDetailGrid';

import CustomBreadcrumb from '../../../../global/components/CustomBreadcrumb';
import PageSpinner from '../../../../global/components/PageSpinner';
import FoodDetailDescription from '../../components/FoodDetailDescription';
import FoodDetailImage from '../../components/FoodDetailImage';
import FoodDetailPrice from '../../components/FoodDetailPrice';
import FoodDetailUser from '../../components/FoodDetailUser';
import conversationApi from '../../../../api/conversationApi';

const FoodDetailPage = () => {
   const navigate = useNavigate();
   const toast = useToast();
   const dispatch = useDispatch();
   const { foodSlug } = useParams();

   const cartId = useSelector(authCartId);

   const [isAddButtonLoading, setIsAddButtonLoading] = useState(false);
   const [isFoodDetailLoading, setIsFoodDetailLoading] = useState(false);
   const [foodDetail, setFoodDetail] = useState(null);

   useEffect(() => {
      const getFoodDetailByParams = async () => {
         try {
            setIsFoodDetailLoading(true);

            const foodDetailResponse = await foodApi.getFoodBySlug(foodSlug);

            setFoodDetail(foodDetailResponse);

            setIsFoodDetailLoading(false);
         } catch (error) {
            console.log(error);
         }
      };
      getFoodDetailByParams();
   }, [foodSlug]);

   const handleClickCart = async () => {
      try {
         setIsAddButtonLoading(true);

         const upsertCartItemResponse = await cartApi.upsertCart({
            cartId,
            data: {
               foodId: foodDetail?.id,
            },
         });

         if (!upsertCartItemResponse) return;

         toast({
            title: `Add ${foodDetail.name} successful`,
            status: 'success',
            position: 'top-right',
            isClosable: true,
         });

         const addToCartAction = cartActions.addToCart(upsertCartItemResponse);
         dispatch(addToCartAction);

         setIsAddButtonLoading(false);
      } catch (error) {
         toast({
            title: `Something when wrong!`,
            status: 'error',
            position: 'top-right',
         });
         setIsAddButtonLoading(false);
      }
   };

   const handleClickSendMessageToShop = async () => {
      try {
         const response = await conversationApi.createConversation({
            userId: foodDetail?.userId,
         });

         navigate(`/message/${response.conversationId}`);
      } catch (error) {
         console.log('🚀 ~ error', error);
      }
   };

   return (
      <PageSpinner isLoading={isFoodDetailLoading || !cartId}>
         <Box pt='4' pb='8'>
            <Box pb='8'>
               <CustomBreadcrumb foodSlug={foodDetail?.name} />
            </Box>

            <FoodDetailImage photoURL={foodDetail?.photoURL} />

            <Grid templateColumns='repeat(3, 1fr)' gap={`${GRID_GAP}px`}>
               <GridItem
                  colSpan={2}
                  borderRightColor='gray.300'
                  borderRightWidth={1}
                  pr={`${GRID_GAP}px`}
                  display='flex'
                  flexDirection='column'
                  gap={5}
               >
                  <FoodDetailDescription
                     categoryName={foodDetail?.category.name}
                     foodName={foodDetail?.name}
                     foodDescription={foodDetail?.description}
                     foodShortDescription={foodDetail?.shortDescription}
                  />
               </GridItem>

               <GridItem colSpan={1}>
                  <Box pb='3'>
                     <FoodDetailUser
                        authorUserId={foodDetail?.userId}
                        authorUserPhotoURL={foodDetail?.user.photoURL}
                        authorUserEmail={foodDetail?.user.email}
                        authorUserName={foodDetail?.user.name}
                        onClickSendMessageToShop={handleClickSendMessageToShop}
                     />
                  </Box>
                  <FoodDetailPrice
                     foodPrice={foodDetail?.price}
                     onClickCart={handleClickCart}
                     isAddButtonLoading={isAddButtonLoading}
                  />
               </GridItem>
            </Grid>
         </Box>
      </PageSpinner>
   );
};

export default FoodDetailPage;
