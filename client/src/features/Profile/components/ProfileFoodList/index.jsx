import { Box, Grid, GridItem } from '@chakra-ui/react';
import FoodCard from '../../../Food/components/FoodCard';

const ProfileFoodList = ({ data, columns = 3 }) => {
   return (
      <Box>
         <Grid templateColumns={`repeat(${columns}, 1fr)`} gap='6'>
            {data?.map((food) => (
               <GridItem colSpan={1} key={food.id}>
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
   );
};

export default ProfileFoodList;
