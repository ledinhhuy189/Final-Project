import {
   Avatar,
   Button,
   Center,
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
import React from 'react';
import { BsFillReplyFill, BsPersonFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authData } from '../../../features/Auth/authSlice';
import logout from '../../../firebase/logout';
import useUserLogged from '../../../hooks/useUserLogged';
import Search from '../Search';

const subMenuStyle = {
   fontWeight: 'bold',
   color: 'gray.600',
   transition: '0.2s ease-out',
   cursor: 'pointer',
   _hover: {
      color: 'black',
   },
};

const Header = () => {
   const { userData } = useSelector(authData);
   const userLogged = useUserLogged();
   const navigate = useNavigate();

   const onClickLogo = () => {
      navigate('/home');
   };

   return (
      <Center
         background='white'
         borderWidth='7px 0 2px 0'
         borderTopColor='blue.700'
         h='20'
      >
         <Container maxW='1400px'>
            <Grid templateColumns='repeat(2, 1fr)' gap={6}>
               <GridItem w='100%' h='10'>
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
                        transition='0.2s ease-out'
                        _hover={{
                           transform: 'scale(1.1)',
                        }}
                     >
                        Logo
                     </Text>
                     <Text {...subMenuStyle}>Features</Text>
                     <Text {...subMenuStyle}>Blog</Text>
                     <Text {...subMenuStyle}>Pricing</Text>
                  </HStack>
               </GridItem>
               <GridItem w='100%' h='10'>
                  {userLogged ? (
                     <UserLogin navigate={navigate} userData={userData} />
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
   const { navigate, userData } = props;

   const onClickProfile = () => {
      navigate(`/profile/${userData.email}`);
   };

   const onClickLogout = async () => {
      const logoutResponse = await logout();
      if (logoutResponse.message === 'logout_success') {
         localStorage.setItem('providerData', false);
         return (window.location = '/home');
      }
   };

   return (
      <Flex justifyContent='end' gap='20px'>
         <Search />
         <Menu isLazy>
            <MenuButton>
               <Avatar w='40px' h='40px' />
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
