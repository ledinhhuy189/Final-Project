import { Search2Icon } from '@chakra-ui/icons';
import {
   Avatar,
   Button,
   Center,
   Container,
   Grid,
   GridItem,
   HStack,
   Input,
   InputGroup,
   InputLeftElement,
   Text,
} from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { authData } from '../../../features/Auth/authSlice';

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
                  {Object.keys(userData).length > 0 ? (
                     <UserLogin />
                  ) : (
                     <UserNotLogin />
                  )}
               </GridItem>
            </Grid>
         </Container>
      </Center>
   );
};

const UserLogin = () => {
   return (
      <HStack justifyContent='end' spacing='10px'>
         <Avatar w='40px' h='40px' />
         <Text>Thanh Nguyen</Text>
      </HStack>
   );
};

const UserNotLogin = () => {
   return (
      <HStack justifyContent='end' spacing='10px'>
         <InputGroup w='300px'>
            <InputLeftElement
               pointerEvents='none'
               children={<Search2Icon color='gray.300' />}
            />
            <Input type='tel' placeholder='Search here...' />
         </InputGroup>
         <Button>Register</Button>
         <Button colorScheme='blue'>Login</Button>
      </HStack>
   );
};

export default Header;
