import {
   Image,
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalFooter,
   ModalHeader,
   ModalOverlay,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';

MessageImageModal.propTypes = {
   isOpen: PropTypes.bool,
   imageSrc: PropTypes.string,
   onClose: PropTypes.func.isRequired,
};

MessageImageModal.defaultProps = {
   isOpen: false,
   imageSrc: '',
};

function MessageImageModal({ isOpen, onClose, imageSrc }) {
   return (
      <Modal isOpen={isOpen} onClose={onClose} size='5xl' isCentered='true'>
         <ModalOverlay />
         <ModalContent>
            <ModalHeader>Image</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
               <Image src={imageSrc} />
            </ModalBody>

            <ModalFooter></ModalFooter>
         </ModalContent>
      </Modal>
   );
}

export default MessageImageModal;
