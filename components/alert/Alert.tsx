import React, { MouseEventHandler } from "react";
import {
  AlertContainer,
  AlertOverlay,
  AlertBody,
  AlertMessage,
  Button,
  ButtonContainer
} from "./styled";

type Props = {
  message: string;
  handleConfirm: React.MouseEventHandler<HTMLButtonElement>;
  handleClose: React.MouseEventHandler<HTMLButtonElement>;
};

const Alert = ({ message, handleConfirm, handleClose }: Props) => {
  return (
    <AlertContainer>
      <AlertOverlay></AlertOverlay>
      <AlertBody>
        <AlertMessage>{message}</AlertMessage>
        <ButtonContainer>
          <Button $bgcolor="#0d6efd" $color="white" onClick={handleConfirm}>
            Confirm
          </Button>
          <Button $bgcolor="#0d6efd" $color="white" onClick={handleClose}>
            Cancel
          </Button>
        </ButtonContainer>
      </AlertBody>
    </AlertContainer>
  );
};

export default Alert;
