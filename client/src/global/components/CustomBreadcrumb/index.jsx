import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import React from 'react';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import PropTypes from 'prop-types';

CustomBreadcrumb.propTypes = {
   email: PropTypes.string,
};

CustomBreadcrumb.defaultProps = {
   email: 'Loading...',
};

function CustomBreadcrumb(props) {
   const { email } = props;

   const DynamicEmail = () => <span>{email}</span>;

   const routes = [
      {
         path: '/profile/:email',
         breadcrumb: DynamicEmail,
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
