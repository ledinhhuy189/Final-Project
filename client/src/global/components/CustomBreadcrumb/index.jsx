import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import useBreadcrumbs from 'use-react-router-breadcrumbs';

CustomBreadcrumb.propTypes = {
   email: PropTypes.string,
   foodSlug: PropTypes.string,
};

CustomBreadcrumb.defaultProps = {
   email: 'Loading...',
   foodSlug: 'Loading...',
};

function CustomBreadcrumb(props) {
   const { email, foodSlug } = props;

   const DynamicEmail = () => <span>{email}</span>;
   const DynamicFoodSlug = () => <span>{foodSlug}</span>;

   const routes = [
      {
         path: '/profile/:email',
         breadcrumb: DynamicEmail,
      },
      {
         path: '/food/:foodSlug',
         breadcrumb: DynamicFoodSlug,
      },
   ];

   const breadcrumbs = useBreadcrumbs(routes);

   return (
      <Breadcrumb
         spacing='8px'
         separator={<ChevronRightIcon color='gray.500' />}
      >
         {breadcrumbs.map(({ breadcrumb, match }) => (
            <BreadcrumbItem key={breadcrumb.key}>
               <BreadcrumbLink href={match.url}>{breadcrumb}</BreadcrumbLink>
            </BreadcrumbItem>
         ))}
      </Breadcrumb>
   );
}

export default CustomBreadcrumb;
