import React from "react";
import {
  MessageContainer,
  ToastClose,
  ToastMessage,
  ToastTitle,
} from "./styled";

const Toast = ({ type, message, close }: Omit<ToastData, "id">) => {
  return (
    <MessageContainer>
      <ToastTitle $type={type}>
        {type}
        <ToastClose onClick={() => close()}>X</ToastClose>
      </ToastTitle>
      <ToastMessage>{message}</ToastMessage>
    </MessageContainer>
  );
};

export const toast = {
  add() {},
};

export default Toast;
