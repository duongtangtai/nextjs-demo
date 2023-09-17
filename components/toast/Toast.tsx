import React from "react";
import { MessageContainer, ToastMessage, ToastTitle } from "./styled";


const Toast = ({ type, message }: Omit<ToastData, "id">) => {
  return (
    <MessageContainer>
      <ToastTitle $type={type}>{type}</ToastTitle>
      <ToastMessage>{message}</ToastMessage>
    </MessageContainer>
  );
};

export const toast = {
  add() {},
};

export default Toast;
