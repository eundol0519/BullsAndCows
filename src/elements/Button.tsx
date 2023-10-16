import { ReactNode, useState } from "react";
import styled from "@emotion/styled/macro";

interface Props {
  children: ReactNode;
  loadingYN?: boolean;
  disabled?: boolean;
  onClick?: any;
  className?: string;
}

const Button = ({
  children,
  loadingYN = false,
  disabled = false,
  onClick,
  className,
}: Props) => {
  const [loading, setLoading] = useState(false);

  return (
    <Wrap
      className={className}
      type="button"
      onClick={
        Boolean(loadingYN)
          ? () => {
              if (loading) return;

              setLoading(true);
              setTimeout(() => {
                onClick && onClick();
                setLoading(false);
              }, 500);
            }
          : onClick
      }
      disabled={loading || disabled}
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
