import { Search2Icon } from '@chakra-ui/icons';
import {
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

const Header = () => {
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
                     >
                        Logo
                     </Text>
                     <Text fontWeight='bold' color='gray.600'>
                        Features
                     </Text>
                     <Text fontWeight='bold' color='gray.600'>
                        Blog
                     </Text>
                     <Text fontWeight='bold' color='gray.600'>
                        Pricing
                     </Text>
                  </HStack>
               </GridItem>

               <GridItem w='100%' h='10'>
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
               </GridItem>
            </Grid>
         </Container>
      </Center>
   );
};

export default Header;
