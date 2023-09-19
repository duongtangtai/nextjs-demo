import React, { useEffect } from "react";
import { Container } from "./styled";
import Toast from "./Toast";

type Props = {
  toasts: ToastData[]
}

const ToastContainer = ({toasts} : Props) => {

  return <Container>
    {toasts.map((toast) => <Toast key={toast.id} type={toast.type} message={toast.message} close={toast.close}/>)}
  </Container>;
};

export default ToastContainer;
