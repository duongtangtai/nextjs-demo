import React, { ReactNode, MouseEventHandler, memo} from "react";
import { ButtonContainer } from "./styled";

type Props = {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  state?: "active" | "disabled";
};

const Button = ({ children, onClick, state = "active" }: Props) => {
  console.log("render button")
  if (state === "active") {
    return (
      <ButtonContainer $state={state} onClick={onClick}>
        {children}
      </ButtonContainer>
    );
  } else {
    return <ButtonContainer $state={state}>{children}</ButtonContainer>;
  }
};

export default memo(Button);
