import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

useDebounce.propTypes = {
   value: PropTypes.string,
   delay: PropTypes.number,
};

useDebounce.defaultProps = {
   delay: 500,
};

function useDebounce(value, delay = 500) {
   const [debounceValue, setDebounceValue] = useState(value);

   useEffect(() => {
      const debounceHandler = setTimeout(() => setDebounceValue(value), delay);
      return () => clearTimeout(debounceHandler);
      // eslint-disable-next-line
   }, [value]);

   return debounceValue;
}

export default useDebounce;
