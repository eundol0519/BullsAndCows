import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast, { notify } from "../elements/Toast";
import Content from "../components/Content";

const Option = () => {
  const navigation = useNavigate();

  const [count, setCount] = useState(3);
  const [number, setNumber] = useState<number[]>([]);

  useEffect(() => {
    mixHandler();
  }, []);

  const mixHandler = () => {
    const result = makeRandomNumber();

    setNumber(result);
  };

  const makeRandomNumber = () => {
    let numbers: number[] = [];

    while (numbers.length < count) {
      const number = Math.floor(Math.random() * 10); // 0 ~ 9
      const notSame = !numbers.includes(number);

      notSame && numbers.push(number);
    }

    return numbers;
  };

  const countHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCount(Number(e.target.value));
  };

  return (
    <div>
      <div className="rules">
        <h3>👉 선택지</h3>
      </div>
      <div className="optionList">
        <div>
          <label>숫자 개수 : </label>
          <label>
            <input
              type="radio"
              name="numberOfNumbers"
              value="3"
              checked={count === 3}
              onChange={countHandler}
            />
            3
          </label>
          <label>
            <input
              type="radio"
              name="numberOfNumbers"
              value="4"
              checked={count === 4}
              onChange={countHandler}
            />
            4
          </label>
        </div>
        <br />
        <label>숫자 : {number.map((_) => "_ ")}</label>
      </div>
      <br />
      <ButtonWrap>
        <button
          onClick={() => {
            mixHandler();
            notify({
              type: "success",
              text: "숫자가 생성되었습니다.",
            });
          }}
        >
          숫자 생성
        </button>
        <button
          onClick={() => {
            navigation("/gameStart");
          }}
        >
          시작하기
        </button>
        <button
          onClick={() => {
            navigation(-1);
          }}
        >
          뒤로가기
        </button>
      </ButtonWrap>
      <Toast />
    </div>
  );
};

const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

export default Option;
