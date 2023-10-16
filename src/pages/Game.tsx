import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { getGameOptionState } from "../recoil/atom";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import Toast, { notify } from "../elements/Toast";
import Input from "../elements/Input";
import { css } from "@emotion/react";
import Button from "../elements/Button";

interface AnswerLogProps {
  number: string;
  strike: number;
  ball: number;
  out: number;
}

const Game = () => {
  const navigation = useNavigate();

  const { numberCount, roundCount, numbers } =
    useRecoilValue(getGameOptionState);
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
      <h1
        css={css`
          text-align: center;
          font-size: 100px;
          margin: 0;
        `}
      >
        {answerLog.length <= 10 && end ? numbers : numbers.map((_) => "_ ")}
      </h1>
      <LogList lengthYN={answerLog.length > 0}>
        {answerLog.map((item) => (
          <LogItem>
            <strong>{item.number}</strong>
            <hr />
            Strike : <strong>{item.strike}</strong> | Ball :{" "}
            <strong>{item.ball}</strong> | Out : <strong>{item.out}</strong>
          </LogItem>
        ))}
      </LogList>
      <Input
        type="number"
        name="answer"
        onChange={inputHandler}
        value={answer}
        placeholder={`${numberCount}개의 숫자를 입력해주세요.`}
      />
      <div>
        <Button onClick={submit} disabled={end}>
          제출하기
        </Button>
        <Button
          onClick={() => {
            navigation("/option");
          }}
        >
          뒤로가기
        </Button>
      </div>
      <Toast />
    </div>
  );
};

const LogList = styled.div<{ lengthYN: boolean }>`
  max-height: 400px;
  overflow: auto;
  padding: 10px;
  border-radius: 15px;
  background: ${({ lengthYN }) => (lengthYN ? "#eee" : "white")};
`;

const LogItem = styled.div`
  padding: 10px;
  margin: 10px 0;
  border: 2px solid var(--main-color);
  border-radius: 15px;
  text-align: center;
  background: white;

  strong {
    font-weight: 700;
  }
`;

export default Game;
