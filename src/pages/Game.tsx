import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { getGameOptionState } from "../recoil/atom";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import Toast, { notify } from "../elements/Toast";
import Input from "../elements/Input";

interface AnswerLogProps {
  number: string;
  strike: number;
  ball: number;
  out: number;
}

const Game = () => {
  const navigation = useNavigate();

  const { numberCount, numbers } = useRecoilValue(getGameOptionState);
  const [answer, setAnswer] = useState("");
  const [answerLog, setAnswerLog] = useState<AnswerLogProps[]>([]);
  const [end, setEnd] = useState(false);

  useEffect(() => {
    if (numbers.length === 0) {
      navigation("/option");
    }
  }, []);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length > numberCount) {
      return;
    } else {
      setAnswer(value);
    }
  };

  const submit = () => {
    if (answerLog.length >= 10) {
      setEnd(true);
      notify({
        type: "error",
        text: "10라운드까지 정답을 맞추지 못하셨습니다😢 게임이 종료됩니다.",
      });
      return;
    }

    const strikeCount = numbers.filter(
      (item, i) => Number(answer.split("")[i]) === item
    ).length;

    if (strikeCount === numberCount) {
      setEnd(true);
      notify({
        type: "success",
        text: "정답입니다🥳",
      });
    }

    const ballCount = answer
      .split("")
      .filter(
        (item, i) =>
          numbers[i] !== Number(item) && numbers.includes(Number(item))
      ).length;

    const outCount = numberCount - (strikeCount + ballCount);

    const log = {
      number: answer,
      strike: strikeCount,
      ball: ballCount,
      out: outCount,
    };

    setAnswerLog((prev) => {
      return [...prev, log];
    });
  };

  return (
    <div>
      <h1>
        {answerLog.length <= 10 && end ? numbers : numbers.map((_) => "_ ")}
      </h1>
      <div>
        {answerLog.map((item) => (
          <LogItem>
            {item.number}
            <br />
            Strike: {item.strike}/Ball: {item.ball}/Out: {item.out}
          </LogItem>
        ))}
      </div>
      <Input
        type="number"
        name="answer"
        onChange={inputHandler}
        value={answer}
      />
      <ButtonWrap>
        <button onClick={submit} disabled={end}>
          제출하기
        </button>
        <button
          onClick={() => {
            navigation("/option");
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
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

const LogItem = styled.div`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #dadada;
`;

export default Game;
