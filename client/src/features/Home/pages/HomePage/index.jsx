import { Box, Grid, GridItem } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import foodApi from '../../../../api/foodApi';
import ComponentLoader from '../../../../global/components/ComponentLoader';
import FoodCard from '../../../Food/components/FoodCard';

const HomePage = () => {
   const [foodList, setFoodList] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const getFoodListInDb = async () => {
         try {
            setLoading(true);
            const foodResponse = await foodApi.getAllFood();
            setFoodList(foodResponse);
            setLoading(false);
         } catch (error) {
            console.log(error);
            setLoading(false);
         }
      };
      getFoodListInDb();
   }, []);

   return (
      <Box>
         <ComponentLoader loading={loading}>
            <Grid templateColumns='repeat(25, 1fr)' gap='6'>
               {foodList?.map((food) => (
                  <GridItem colSpan={5} key={food.id}>
                     <FoodCard
                        photoURL={food.photoURL[0]}
                        name={food.name}
                        shortDescription={food.shortDescription}
                        price={food.price}
                        categoryName={food.category.name}
                        foodId={food.id}
                     />
                  </GridItem>
               ))}
            </Grid>
         </ComponentLoader>
      </Box>
   );
};

export default HomePage;
