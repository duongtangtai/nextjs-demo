import React, { memo } from "react";
import { Button, FormContainer, Input, InputContainer, Label } from "./styled";
import { Select, Space} from "antd";

type Props = {
  inputs: Input[];
  handleSubmit: Function;
  data?: any;
  inputPrefix?: string;
};
const {Option} = Select;

const Form = ({ inputs, handleSubmit, data, inputPrefix}: Props) => {
  // console.log("render form with")
  // console.log("inputPrefix: " + inputPrefix)
  // if (data && inputPrefix) {
  //   for (var i = 0 ; i < inputs.length; i ++) {
  //     let a = inputs[i].id;
  //     a = a.replace(inputPrefix, "")
  //     console.log(a)
  //   }
  // }
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const elements = e.currentTarget.getElementsByTagName("input");
    let obj = {};
    Array.from(elements).forEach(({ id, value }) => {
      obj = {
        ...obj,
        [id]: value,
      };
    });
    e.currentTarget.getElementsByClassName
    return handleSubmit(obj);
  };

  return (
    <FormContainer onSubmit={onSubmit}>
      {data && inputPrefix && inputs.map((input) => (
        <InputContainer key={input.id}>
          <Label htmlFor={input.id}>{input.description}</Label>
          <Input
            type={input.type}
            id={input.id}
            name={input.name}
            placeholder={input.placeHolder}
            required={input.isRequired}
            defaultValue={data[input.id.replace(inputPrefix, "")]}
          />
        </InputContainer>
      ))}
      {!data && inputs.map((input) => (
        <InputContainer key={input.id}>
          <Label htmlFor={input.id}>{input.description}</Label>
          <Input
            type={input.type}
            id={input.id}
            name={input.name}
            placeholder={input.placeHolder}
            required={input.isRequired}
            autoComplete="one-time-code"
          />
        </InputContainer>
        ))}
      <InputContainer>
        <Label htmlFor="test">Role Selection</Label>
        <Select
          id="test"
          mode="multiple"
          style={{ width: "100%" }}
          placeholder="Select roles"
          defaultValue={["china"]}
          onChange={(e) => {console.log("select on change: " + e)}}
          optionLabelProp="label"
        >
          <Option value="china" label="China">
            <Space>
              <span role="img" aria-label="China">
                🇨🇳
              </span>
              China (中国)
            </Space>
          </Option>
          <Option value="usa" label="USA">
            <Space>
              <span role="img" aria-label="USA">
                🇺🇸
              </span>
              USA (美国)
            </Space>
          </Option>
          <Option value="japan" label="Japan">
            <Space>
              <span role="img" aria-label="Japan">
                🇯🇵
              </span>
              Japan (日本)
            </Space>
          </Option>
          <Option value="korea" label="Korea">
            <Space>
              <span role="img" aria-label="Korea">
                🇰🇷
              </span>
              Korea (韩国)
            </Space>
          </Option>
        </Select>
      </InputContainer>
      <Button $bgcolor="#0d6efd" $color="white" type="submit">
        Submit
      </Button>
    </FormContainer>
  );
};

export default memo(Form);
