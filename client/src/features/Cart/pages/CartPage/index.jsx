import {
   Box,
   Button,
   Checkbox,
   Flex,
   Icon,
   Image,
   Text,
   VStack,
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { RiHomeSmileLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import cartApi from '../../../../api/cartApi';
import CustomBreadcrumb from '../../../../global/components/CustomBreadcrumb';
import CustomTable from '../../../../global/components/CustomTable';
import NumberInputWithButton from '../../../../global/components/NumberInputWithButton';
import priceFormat from '../../../../utils/priceFormat';
import { authCartId } from '../../../Auth/authSlice';
import { cartActions, cartData, cartLoading } from '../../cartSlice';
import TempPriceCalculator from '../../components/TempPriceCalculator';

function CartPage(props) {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const cartDataRedux = useSelector(cartData);
   const cartLoadingRedux = useSelector(cartLoading);
   const cartId = useSelector(authCartId);

   const [cartList, setCartList] = useState([]);
   const [selectedItems, setSelectedItems] = useState([]);

   useEffect(() => {
      if (cartLoadingRedux) return;
      const newList = cartDataRedux?.reduce((acc, item) => {
         const findUser = acc.findIndex(
            (user) => user.userId === item.food.userId
         );

         if (findUser !== -1) {
            acc[findUser].data.push({
               ...item.food,
               quantity: item.quantity,
               cartItemId: item.id,
            });
            return acc;
         }

         acc.push({
            userId: item.food.userId,
            user: item.food.user,
            data: [
               { ...item.food, quantity: item.quantity, cartItemId: item.id },
            ],
         });
         return acc;
      }, []);

      setCartList(newList);
   }, [cartDataRedux, cartLoadingRedux]);

   const columns = useMemo(
      () => [
         {
            title: '',
            dataIndex: 'id',
            width: '2%',
            render: (value, row) => {
               return (
                  <Checkbox
                     onChange={() => handleChangeCheckBox(row)}
                     size='lg'
                  />
               );
            },
         },
         {
            title: 'Image',
            width: '10%',
            align: 'center',
            dataIndex: ['photoURL'],
            render: (value) => {
               return <Image src={value[0]} px='30px' objectFit='cover' />;
            },
         },
         {
            title: 'Name',
            width: '12%',
            dataIndex: ['name'],
         },
         {
            title: 'Price',
            width: '10%',
            dataIndex: ['price'],
            align: 'center',
            render: (value) => {
               return (
                  <Text fontWeight='bold' as='p'>
                     {priceFormat(value)}
                  </Text>
               );
            },
         },
         {
            title: 'Quantity',
            width: '5%',
            dataIndex: ['quantity'],
            align: 'center',
            render: (value, row) => {
               return (
                  <NumberInputWithButton
                     value={value}
                     onClickIncrement={() => handleClickIncrement(row.id)}
                     onClickDecrease={() => handleClickDecrease(row.id)}
                  />
               );
            },
         },
         {
            title: 'Total',
            width: '10%',
            dataIndex: ['price'],
            align: 'center',
            render: (value, row) => {
               return (
                  <Text fontWeight='bold' as='p' color='red.500'>
                     {priceFormat(value * row.quantity)}
                  </Text>
               );
            },
         },
         {
            title: '',
            width: '10%',
            dataIndex: 'cartItemId',
            align: 'center',
            render: (value, row) => {
               return (
                  <Button
                     colorScheme='red'
                     variant='outline'
                     onClick={() => handleRemoveCartItem(row.cartItemId)}
                  >
                     Delete
                  </Button>
               );
            },
         },
      ],
      // eslint-disable-next-line
      []
   );

   const handleClickIncrement = async (foodId) => {
      try {
         const upsertCartItemResponse = await cartApi.upsertCart({
            cartId,
            data: {
               foodId: foodId,
            },
         });

         handleChangeQuantitySelected({
            cartItemId: upsertCartItemResponse.id,
            type: 'increase',
         });

         const addToCartAction = cartActions.addToCart(upsertCartItemResponse);
         dispatch(addToCartAction);
      } catch (error) {
         console.log(error);
      }
   };

   const handleClickDecrease = async (foodId) => {
      try {
         const upsertCartItemResponse = await cartApi.upsertCart({
            cartId,
            data: {
               foodId: foodId,
               type: 'decrease',
            },
         });

         handleChangeQuantitySelected({
            cartItemId: upsertCartItemResponse.id,
            type: 'decrease',
         });

         const addToCartAction = cartActions.removeFromCart(
            upsertCartItemResponse
         );
         dispatch(addToCartAction);
      } catch (error) {
         console.log(error);
      }
   };

   const handleRemoveCartItem = async (cartItemId) => {
      try {
         const removeResponse = await cartApi.removeCartItem(cartItemId);

         handleRemoveCartItemSelected(removeResponse.id);

         const removeAction = cartActions.removeCartItem(removeResponse);
         dispatch(removeAction);
      } catch (error) {
         console.log(error);
      }
   };

   const handleChangeCheckBox = (cartItem) => {
      setSelectedItems((prev) => {
         if (prev.some((i) => i.id === cartItem.id)) {
            return prev.filter((item) => item.id !== cartItem.id);
         }

         prev.push(cartItem);
         return [...prev];
      });
   };

   const handleChangeQuantitySelected = ({ cartItemId, type }) => {
      setSelectedItems((prev) => {
         const isType = type === 'decrease' ? -1 : 1;
         const findIndex = prev.findIndex(
            (item) => item.cartItemId === cartItemId
         );
         if (findIndex === -1) return prev;
         prev[findIndex].quantity = prev[findIndex].quantity + isType;
         return [...prev];
      });
   };

   const handleRemoveCartItemSelected = (cartItemId) => {
      setSelectedItems((prev) => {
         return prev.filter((item) => item.cartItemId !== cartItemId);
      });
   };

   return (
      <>
         <VStack gap='2' w='full' pt='6' pb='28'>
            <Flex justifyContent='start' w='full'>
               <CustomBreadcrumb />
            </Flex>
            {cartList?.map((cart) => (
               <Box
                  w='full'
                  bg='white'
                  px='20px'
                  rounded='xl'
                  shadow='md'
                  key={cart.userId}
               >
                  <Flex px='4' pt='6' alignItems='center' gap='4'>
                     <Icon
                        as={RiHomeSmileLine}
                        fontSize='xl'
                        cursor='pointer'
                        onClick={() => navigate(`/profile/${cart.user.email}`)}
                     />
                     <Text
                        cursor='pointer'
                        onClick={() => navigate(`/profile/${cart.user.email}`)}
                     >
                        {cart.user.email}
                     </Text>
                  </Flex>
                  <CustomTable
                     columns={columns}
                     data={cart.data}
                     disableThead={false}
                  />
               </Box>
            ))}
         </VStack>
         <TempPriceCalculator selectedItems={selectedItems} />
      </>
   );
}

export default CartPage;
