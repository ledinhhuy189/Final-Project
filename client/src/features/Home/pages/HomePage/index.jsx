import { Box, Grid, GridItem, Heading } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import categoryApi from '../../../../api/categoryApi';
import foodApi from '../../../../api/foodApi';
import ComponentLoader from '../../../../global/components/ComponentLoader';
import FoodCard from '../../../Food/components/FoodCard';
import HomeBanner from '../../components/HomeBanner';
import HomeCategory from '../../components/HomeCategory';

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

   const { data: categoryData } = useQuery(
      ['category'],
      async () => await categoryApi.getCategory()
   );

   return (
      <Box>
         <ComponentLoader loading={loading}>
            <Box pt={4} pb={12}>
               <HomeBanner />
            </Box>
            <Box pb={12}>
               <Heading fontSize='26px' color='green.600' pb={8}>
                  Category
               </Heading>
               <HomeCategory data={categoryData} />
            </Box>
            <Box>
               <Heading fontSize='28px' color='green.600' pb={8}>
                  Recommend Food
               </Heading>
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
                           foodSlug={food.slug}
                        />
                     </GridItem>
                  ))}
               </Grid>
            </Box>
         </ComponentLoader>
      </Box>
   );
};

export default HomePage;
