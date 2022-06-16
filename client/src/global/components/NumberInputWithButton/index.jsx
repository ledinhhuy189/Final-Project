import { Button, HStack, Input, useNumberInput } from '@chakra-ui/react';
import React from 'react';

function NumberInputWithButton({ value, onClickIncrement, onClickDecrease }) {
   const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
      useNumberInput({
         step: 1,
         defaultValue: value,
         min: 1,
         max: 99,
      });

   const inc = getIncrementButtonProps();
   const dec = getDecrementButtonProps();
   const input = getInputProps();

   return (
      <HStack w='fit-content'>
         <Button {...dec} onClick={onClickDecrease} disabled={value === 1}>
            -
         </Button>
         <Input {...input} textAlign='center' isReadOnly={true} />
         <Button {...inc} onClick={onClickIncrement}>
            +
         </Button>
      </HStack>
   );
}

export default NumberInputWithButton;
