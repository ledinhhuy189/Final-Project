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
   useToast,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { BsFillReplyFill, BsPersonFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { authData } from '../../../features/Auth/authSlice';
import MessageToast from '../../../features/Message/components/MessageToast';
import {
   incomingMessage,
   isSeenMessage,
   messageActions,
} from '../../../features/Message/messageSlice';
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
   const incomingMessageRedux = useSelector(incomingMessage);
   const isSeenMessageRedux = useSelector(isSeenMessage);
   const { userData } = useSelector(authData);

   const dispatch = useDispatch();
   const userLogged = useUserLogged();
   const navigate = useNavigate();
   const toast = useToast();
   let location = useLocation();

   const onClickLogo = () => {
      navigate('/home');
   };

   useEffect(() => {
      if (Object.keys(incomingMessageRedux).length <= 0 || isSeenMessageRedux)
         return;

      const isSeenMessageAction = messageActions.seenMessage();
      dispatch(isSeenMessageAction);

      if (
         location.pathname.split('/').length > 2 &&
         location.pathname.split('/')[1] === 'message'
      )
         return;

      toast({
         title: incomingMessageRedux.content,
         isClosable: true,
         position: 'top-right',
         render: () => (
            <MessageToast
               photoURL={incomingMessageRedux.from.photoURL}
               content={incomingMessageRedux.content}
               name={incomingMessageRedux.from.name}
               conversationId={incomingMessageRedux.conversationId}
            />
         ),
      });
   }, [incomingMessageRedux, location, toast, isSeenMessageRedux, dispatch]);

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
               <GridItem colStart={13} colEnd={25}>
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
               <Avatar w='40px' h='40px' src={userData.photoURL} />
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
