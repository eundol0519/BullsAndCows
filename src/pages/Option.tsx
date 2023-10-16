import styled from "@emotion/styled";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Toast, { notify } from "../elements/Toast";
import { useRecoilState } from "recoil";
import { gameOptionState } from "../recoil/atom";
import Input from "../elements/Input";
import { css } from "@emotion/react";
import Button from "../elements/Button";

const Option = () => {
  const navigation = useNavigate();

  const [{ numberCount, roundCount }, setOptionState] =
    useRecoilState(gameOptionState);

  useEffect(() => {
    mixHandler();
  }, [numberCount]);

  const mixHandler = () => {
    const result = makeRandomNumber();

    setOptionState((prev) => {
      return { ...prev, numbers: result };
    });
  };

  const makeRandomNumber = () => {
    let numbers: number[] = [];

    while (numbers.length < numberCount) {
      const number = Math.floor(Math.random() * 10); // 0 ~ 9
      const notSame = !numbers.includes(number);

      notSame && numbers.push(number);
    }

    return numbers;
  };

  const countHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    let value: number | string = null;

    switch (name) {
      case "numberCount":
      case "roundCount":
        value = Number(e.target.value);
        break;
      default:
        value = e.target.value;
        break;
    }

    setOptionState((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <div>
      <h2>Options</h2>
      <div className="optionList">
        <OptionItem>
          <label className="title">숫자 개수</label>
          <hr />
          <label>
            <input
              type="radio"
              name="numberCount"
              value="3"
              checked={numberCount === 3}
              onChange={countHandler}
            />
            3
          </label>
          <label>
            <input
              type="radio"
              name="numberCount"
              value="4"
              checked={numberCount === 4}
              onChange={countHandler}
            />
            4
          </label>
        </OptionItem>
        <OptionItem className="option">
          <label className="title">라운드 수</label>
          <hr />
          <Input name="roundCount" value={roundCount} onChange={countHandler} />
        </OptionItem>
        <p
          css={css`
            font-weight: 700;
          `}
        >
          "{numberCount}글자, {roundCount}라운드"로 게임이 진행됩니다.
        </p>
      </div>
      <br />
      <ButtonWrap>
        <Button
          onClick={() => {
            mixHandler();
            notify({
              type: "success",
              text: "숫자가 생성되었습니다.",
            });
          }}
        >
          숫자 생성
        </Button>
        <Button
          onClick={() => {
            navigation("/gameStart");
          }}
        >
          시작하기
        </Button>
      </ButtonWrap>
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

const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const OptionItem = styled.div`
  margin-bottom: 20px;

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
`;

export default Option;
