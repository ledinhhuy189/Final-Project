import { extendTheme } from '@chakra-ui/react';
import '@fontsource/plus-jakarta-sans/300.css';
import '@fontsource/plus-jakarta-sans/500.css';
import '@fontsource/plus-jakarta-sans/700.css';

const breakpoints = {
   sm: '320px',
   md: '768px',
   lg: '960px',
   xl: '1200px',
   '2xl': '1536px',
};

const colors = {
   mainFont: '#000000',
   subFont: '#6C6C6C',
};

const fonts = {
   heading: 'Plus Jakarta Sans, sans-serif',
   body: 'Plus Jakarta Sans, sans-serif',
};

const theme = extendTheme({
   colors,
   fonts,
   breakpoints,
});

export default theme;
