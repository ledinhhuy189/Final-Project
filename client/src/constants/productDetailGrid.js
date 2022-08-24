export const IMAGES = [
   {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
      alt: 'Two each of gray, white, and black shirts laying flat.',
   },
   {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
      alt: 'Model wearing plain black basic tee.',
   },
   {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
      alt: 'Model wearing plain white basic tee.',
   },
   {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
      alt: 'Model wearing plain gray basic tee.',
   },
];

export const GRID_GAP = 32;

export const MAX_HEIGHT_OF_ROW = 500;

export const IMAGE_LAYOUT = {
   1: [
      {
         colSpan: 3,
         rowSpan: 2,
         height: `${MAX_HEIGHT_OF_ROW}px`,
      },
   ],
   2: [
      {
         colSpan: 2,
         rowSpan: 2,
         height: `${MAX_HEIGHT_OF_ROW}px`,
      },
      {
         colSpan: 1,
         rowSpan: 2,
         height: `${MAX_HEIGHT_OF_ROW}px`,
      },
   ],
   3: [
      {
         colSpan: 1,
         rowSpan: 2,
         height: `${MAX_HEIGHT_OF_ROW}px`,
      },
      {
         colSpan: 1,
         rowSpan: 2,
         height: `${MAX_HEIGHT_OF_ROW}px`,
      },
      {
         colSpan: 1,
         rowSpan: 2,
         height: `${MAX_HEIGHT_OF_ROW}px`,
      },
   ],
   4: [
      {
         colSpan: 1,
         rowSpan: 2,
         height: `${MAX_HEIGHT_OF_ROW}px`,
      },
      {
         colSpan: 1,
         height: `${MAX_HEIGHT_OF_ROW / 2 - GRID_GAP / 2}px`,
      },
      {
         colSpan: 1,
         rowSpan: 2,
         height: `${MAX_HEIGHT_OF_ROW}px`,
      },
      {
         colSpan: 1,
         height: `${MAX_HEIGHT_OF_ROW / 2 - GRID_GAP / 2}px`,
      },
   ],
};
