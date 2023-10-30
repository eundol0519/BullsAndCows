import { forwardRef, type ForwardedRef } from "react";
import styled from "@emotion/styled/macro";

interface Props {
  type?: string;
  requied?: boolean;
  placeholder?: string;
  readOnly?: boolean;
  value: string | number;
  max?: number;
  name: string;
  onChange: any;
  onKeyUp?: any;
  onFocus?: any;
  onBlur?: any;
  enter?: any;
}

const Input = forwardRef(
  (
    {
      type = "string",
      requied = true,
      placeholder = "텍스트를 입력해주세요",
      readOnly = false,
      value,
      max = 1000,
      name,
      onChange,
      onKeyUp,
      onFocus,
      onBlur,
      enter = null,
    }: Props,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && enter) {
        enter();
      }
    };

    return (
      <InputWrap
        type={type}
        required={requied}
        placeholder={placeholder}
        readOnly={readOnly}
        value={value}
        maxLength={max}
        name={name}
        onChange={onChange}
        onKeyUp={onKeyUp}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyPress={onKeyPress}
        ref={ref}
      />
    );
  }
);

const InputWrap = styled.input`
  width: fit-content;
  height: 49px;
  text-align: left;
  color: #212529;
  outline: none;
  border: 2px solid #eee;
  background: #fbfbfb;
  border-radius: 6px;
  padding: 0 15px;
  margin: 10px 0;

  &:focus,
  &:focus-visible {
    border: 2px solid var(--base-color);
    background: white;
  }
`;

export default Input;
