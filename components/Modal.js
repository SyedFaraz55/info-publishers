import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
const CustomModal = ({ isOpen, onClose, title, children, onClick }) => {
  return (
    <Modal size={"full"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          {/* <Button onClick={onClick} colorScheme="red" variant="ghost">
            Delete Distibutor
          </Button> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
