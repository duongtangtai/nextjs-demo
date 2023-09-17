import React, {ChangeEventHandler, memo} from "react";
import { SearchFieldContainer } from "./styled";

type Props = {
    searchId: string,
    searchDisplay: string,
    boxWidth: string,
    value: string,
    onChange: ChangeEventHandler<HTMLInputElement>
}

const SearchField = ({searchId, searchDisplay, boxWidth, value, onChange} : Props) => {
  console.log("render searchfield")
  return (
      <SearchFieldContainer $boxWidth={boxWidth}>
        <label htmlFor={searchId}>{searchDisplay}</label>
        <input id={searchId}
          value={value}
          name={searchId}
          onChange={onChange}
          autoComplete="off"
        />
      </SearchFieldContainer>
)};

export default memo(SearchField);
