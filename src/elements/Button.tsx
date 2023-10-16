import { ReactNode, useState } from "react";
import styled from "@emotion/styled/macro";

interface Props {
  children: ReactNode;
  duplicateClickPrevention?: boolean;
  disabled?: boolean;
  onClick?: any;
  className?: string;
}

const Button = ({
  children,
  duplicateClickPrevention = false,
  disabled = false,
  onClick,
  className,
}: Props) => {
  const [requestingApi, setRequestingApi] = useState(false);

  return (
    <Wrap
      className={className}
      type="button"
      onClick={
        Boolean(duplicateClickPrevention)
          ? () => {
              if (requestingApi) return;

              setRequestingApi(true);
              setTimeout(() => {
                onClick && onClick();
                setRequestingApi(false);
              }, 1000);
            }
          : onClick
      }
      disabled={requestingApi || disabled}
    >
      {children}
    </Wrap>
  );
};

const Wrap = styled.button`
  width: 100%;
  height: 50px;
  border-radius: 15px;
  border: none;
  margin: 5px 0;

  background: var(--main-color);
  color: white;

  &:disabled {
    background: var(--accent-color);
  }
`;

export default Button;
