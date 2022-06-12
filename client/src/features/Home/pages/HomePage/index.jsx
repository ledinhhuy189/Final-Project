import { Box, Grid, GridItem } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import foodApi from '../../../../api/foodApi';
import FoodCard from '../../../Food/components/FoodCard';

const HomePage = () => {
   const [foodList, setFoodList] = useState([]);
   console.log('🚀 ~ foodList', foodList);

   useEffect(() => {
      const getFoodListInDb = async () => {
         const foodResponse = await foodApi.getAllFood();
         setFoodList(foodResponse);
      };
      getFoodListInDb();
   }, []);

   return (
      <Box>
         <Grid templateColumns='repeat(24, 1fr)' gap='6'>
            {foodList?.map((food) => (
               <GridItem colSpan={6} key={food.id}>
                  <FoodCard
                     photoURL={food.photoURL}
                     name={food.name}
                     description={food.description}
                     price={food.price}
                  />
               </GridItem>
            ))}
         </Grid>
      </Box>
   );
};

export default HomePage;
