import { Box, Button, Checkbox, Image, Text, VStack } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cartApi from '../../../../api/cartApi';
import CustomTable from '../../../../global/components/CustomTable';
import NumberInputWithButton from '../../../../global/components/NumberInputWithButton';
import priceFormat from '../../../../utils/priceFormat';
import { authCartId } from '../../../Auth/authSlice';
import { cartActions, cartData, cartLoading } from '../../cartSlice';

function CartPage(props) {
   const dispatch = useDispatch();

   const cartDataRedux = useSelector(cartData);
   const cartLoadingRedux = useSelector(cartLoading);
   const cartId = useSelector(authCartId);

   const [cartList, setCartList] = useState([]);

   useEffect(() => {
      if (cartLoadingRedux) return;
      const newList = cartDataRedux?.reduce((acc, item) => {
         const findUser = acc.findIndex(
            (user) => user.userId === item.food.userId
         );

         if (findUser !== -1) {
            acc[findUser].data.push({ ...item.food, quantity: item.quantity });
            return acc;
         }

         acc.push({
            userId: item.food.userId,
            user: item.food.user,
            data: [{ ...item.food, quantity: item.quantity }],
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
               return <Checkbox />;
            },
         },
         {
            title: 'Image',
            width: '10%',
            align: 'center',
            dataIndex: ['photoURL'],
            render: (value) => {
               return <Image src={value} px='30px' />;
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
                     onClickIncrement={() => handleClickIncrement(row)}
                     onClickDecrease={() => handleClickDecrease(row)}
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
            dataIndex: 'id',
            align: 'center',
            render: (value, row) => {
               return <Button colorScheme='red'>Delete</Button>;
            },
         },
      ],
      // eslint-disable-next-line
      []
   );

   const handleClickIncrement = async (row) => {
      const upsertCartItemResponse = await cartApi.upsertCart({
         cartId,
         data: {
            foodId: row.id,
         },
      });
      const addToCartAction = cartActions.addToCart(upsertCartItemResponse);
      dispatch(addToCartAction);
   };

   const handleClickDecrease = async (row) => {
      const upsertCartItemResponse = await cartApi.upsertCart({
         cartId,
         data: {
            foodId: row.id,
            type: 'decrease',
         },
      });
      const addToCartAction = cartActions.removeFromCart(
         upsertCartItemResponse
      );
      dispatch(addToCartAction);
   };

   return (
      <VStack gap='2'>
         {cartList?.map((cart) => (
            <Box
               w='full'
               bg='white'
               px='20px'
               rounded='xl'
               shadow='md'
               key={cart.userId}
            >
               <CustomTable
                  columns={columns}
                  data={cart.data}
                  disableThead={false}
               />
            </Box>
         ))}
      </VStack>
   );
}

export default CartPage;
