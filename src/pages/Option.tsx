import styled from "@emotion/styled";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Toast, { notify } from "../elements/Toast";
import { useRecoilState } from "recoil";
import { gameOptionState } from "../recoil/atom";

const Option = () => {
  const navigation = useNavigate();

  const [{ count }, setOptionState] = useRecoilState(gameOptionState);

  useEffect(() => {
    mixHandler();
  }, [count]);

  const mixHandler = () => {
    const result = makeRandomNumber();

    setOptionState((prev) => {
      return { ...prev, numbers: result };
    });
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
    setOptionState((prev) => {
      return { ...prev, count: Number(e.target.value) };
    });
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
        <p>"{count}글자"로 게임이 시작됩니다.</p>
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
