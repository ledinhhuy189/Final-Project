import {
   Button,
   Center,
   Circle,
   Container,
   Flex,
   Grid,
   GridItem,
   HStack,
   Icon,
   Menu,
   MenuButton,
   MenuItem,
   MenuList,
   Text,
} from '@chakra-ui/react';
import {
   BsBagFill,
   BsFillPersonFill,
   BsFillReplyFill,
   BsHeartFill,
   BsPersonFill,
} from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authData } from '../../../features/Auth/authSlice';
import { cartCount } from '../../../features/Cart/cartSlice';
import logout from '../../../firebase/logout';
import useUserLogged from '../../../hooks/useUserLogged';
import BadgeCount from '../BadgeCount';
import Search from '../Search';

const subMenuStyle = {
   color: 'gray.500',
   transition: '0.2s ease-out',
   cursor: 'pointer',
   _hover: {
      color: 'green.600',
   },
};

const Header = () => {
   const { userData } = useSelector(authData);
   const count = useSelector(cartCount);

   const userLogged = useUserLogged();
   const navigate = useNavigate();

   const onClickLogo = () => {
      navigate('/home');
   };

   return (
      <Center background='white' borderWidth='0px 0 2px 0' h='20'>
         <Container maxW='1400px'>
            <Grid templateColumns='repeat(24, 1fr)' gap={6}>
               <GridItem colSpan={12}>
                  <HStack
                     w='full'
                     h='full'
                     justifyContent='left'
                     alignItems='center'
                     spacing='60px'
                  >
                     <Text
                        onClick={onClickLogo}
                        fontSize='2xl'
                        fontWeight='bold'
                        justifyContent='left'
                        cursor='pointer'
                        color='green.600'
                     >
                        Foody
                     </Text>
                     <Text
                        {...subMenuStyle}
                        onClick={() => navigate('/message')}
                     >
                        Message
                     </Text>
                     <Text {...subMenuStyle}>Blog</Text>
                     <Text {...subMenuStyle}>Pricing</Text>
                  </HStack>
               </GridItem>
               <GridItem colStart={16} colEnd={25}>
                  {userLogged ? (
                     <UserLogin
                        navigate={navigate}
                        userData={userData}
                        count={count}
                     />
                  ) : (
                     <UserNotLogin navigate={navigate} />
                  )}
               </GridItem>
            </Grid>
         </Container>
      </Center>
   );
};

const UserLogin = (props) => {
   const { navigate, userData, count } = props;

   const onClickProfile = () => {
      navigate(`/profile/${userData.email}`);
   };

   const onClickLogout = async () => {
      const logoutResponse = await logout();
      if (logoutResponse.message === 'logout_success') {
         localStorage.removeItem('providerData');

         return (window.location = '/home');
      }
   };

   return (
      <Flex justifyContent='end' gap='20px'>
         <Search />
         <Circle
            borderColor='gray.300'
            borderWidth='1px'
            size='40px'
            cursor='pointer'
         >
            <Icon as={BsHeartFill} fontSize='md' color='green.600' />
         </Circle>
         <Circle
            borderColor='gray.300'
            borderWidth='1px'
            size='40px'
            cursor='pointer'
            onClick={() => navigate('/cart')}
            position='relative'
         >
            <Icon as={BsBagFill} fontSize='md' color='green.600' />
            {count > 0 && <BadgeCount number={count} />}
         </Circle>
         <Menu isLazy>
            <MenuButton>
               <Circle
                  borderColor='gray.300'
                  borderWidth='1px'
                  size='40px'
                  cursor='pointer'
               >
                  <Icon as={BsFillPersonFill} fontSize='xl' color='green.600' />
               </Circle>
            </MenuButton>
            <MenuList>
               <MenuItem
                  icon={<Icon as={BsPersonFill} />}
                  onClick={onClickProfile}
               >
                  Profile
               </MenuItem>
               <MenuItem
                  icon={<Icon as={BsFillReplyFill} />}
                  onClick={onClickLogout}
               >
                  Logout
               </MenuItem>
            </MenuList>
         </Menu>
      </Flex>
   );
};

const UserNotLogin = (props) => {
   const { navigate } = props;

   const onClickButton = (button) => {
      navigate(`/auth/${button}`);
   };

   return (
      <HStack justifyContent='end' spacing='10px'>
         <Search />
         <Button onClick={() => onClickButton('register')}>Register</Button>
         <Button onClick={() => onClickButton('login')} colorScheme='blue'>
            Login
         </Button>
      </HStack>
   );
};

export default Header;
