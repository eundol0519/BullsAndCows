import styled from "@emotion/styled";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Toast, { notify } from "../elements/Toast";
import { useRecoilState } from "recoil";
import { gameOptionState } from "../recoil/option";
import Input from "../elements/Input";
import { css } from "@emotion/react";
import Button from "../elements/Button";
import { makeRandomNumber } from "../hooks/randomNumber";

const Option = () => {
  const navigation = useNavigate();

  const [{ count, round }, setOptionState] = useRecoilState(gameOptionState);

  useEffect(() => {
    mixHandler();
  }, [count]);

  const mixHandler = () => {
    const randomNumber = makeRandomNumber(count);

    setOptionState((prev) => {
      return { ...prev, answer: randomNumber };
    });
  };

  const countHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    let value: number = null;

    switch (name) {
      case "count":
      case "round":
        const number = Number(e.target.value.replace(/[^0-9]/g, ""));

        if (number <= 50) {
          value = number;
        } else {
          notify({
            type: "error",
            text: "50라운드까지만 설정하실 수 있습니다.",
          });
          value = 50;
        }

        break;
      default:
        console.error("case가 존재하지 않습니다.");
        break;
    }

    setOptionState((prev) => {
      return { ...prev, [name]: value || null };
    });
  };

  return (
    <div>
      <h2>Options</h2>
      <div className="optionList">
        <OptionItem margin={20}>
          <label className="title">숫자 개수</label>
          <hr />
          <div className="radioWrap">
            <RadioItem>
              <input
                type="radio"
                name="count"
                value="3"
                checked={count === 3}
                onChange={countHandler}
              />
              3
            </RadioItem>
            <RadioItem>
              <input
                type="radio"
                name="count"
                value="4"
                checked={count === 4}
                onChange={countHandler}
              />
              4
            </RadioItem>
          </div>
        </OptionItem>
        <OptionItem className="option" margin={0}>
          <label className="title">라운드 수 (최대 50라운드까지)</label>
          <hr />
          <Input name="round" value={round} onChange={countHandler} />
        </OptionItem>
      </div>
      <Button
        onClick={() => {
          mixHandler();
          notify({
            type: "success",
            text: "숫자가 생성되었습니다.",
          });
        }}
        loadingYN
      >
        숫자 생성
      </Button>
      <div
        css={css`
          margin: 20px 0;
          border-bottom: 1px solid #e1e1e1;
        `}
      />
      <Button
        onClick={() => {
          notify({
            type: "success",
            text: `${count}글자, ${round}라운드로 게임이 진행됩니다.`,
          });
          setTimeout(() => {
            navigation("/gameStart");
          }, 2200);
        }}
        loadingYN
      >
        시작하기
      </Button>
      <Button
        onClick={() => {
          navigation("/");
        }}
      >
        뒤로가기
      </Button>
      <Toast />
    </div>
  );
};

const OptionItem = styled.div<{ margin: number }>`
  margin-bottom: ${({ margin }) => `${margin}px`};

  .title {
    display: block;
    font-size: 1rem;
    font-weight: 600;
  }

  hr {
    border: 1px solid #eee;
  }

  input {
    margin-top: 0;
  }

  .radioWrap {
    display: flex;
    gap: 20px;
  }
`;

const RadioItem = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 18px;
  line-height: 2rem;

  [type="radio"],
  span {
    vertical-align: middle;
  }

  [type="radio"] {
    appearance: none;
    border: 1px solid #e1e1e1;
    border-radius: 50%;
    width: 1.25em;
    height: 1.25em;
  }

  [type="radio"]:checked {
    border: 0.4em solid var(--main-color);
  }
`;

export default Option;
