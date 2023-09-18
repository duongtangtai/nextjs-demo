import React from "react";
import { CloseModalBtn, ModalBody, ModalCloseContainer, ModalContainer, ModalOverlay, ModalTitle } from "./styled";

type Props = {
  title: string;
  children: React.ReactNode;
  handleClose: React.MouseEventHandler<HTMLButtonElement>
};

const Modal = ({ title, children, handleClose}: Props) => {

  console.log("render modal")
  return (
    <ModalContainer>
      <ModalOverlay />
      <ModalBody>
        <ModalTitle>
          {title}
          <ModalCloseContainer>
          <CloseModalBtn
            onClick={handleClose}
          >
            X
          </CloseModalBtn>
          </ModalCloseContainer>
        </ModalTitle>
        {children}
      </ModalBody>
    </ModalContainer>
  );
};

export default Modal;
