import React, {
  InputHTMLAttributes,
  ReactComponentElement,
  useEffect,
  useState,
} from "react";
import { useRecoilValue } from "recoil";
import { getGameOptionState } from "../recoil/atom";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import Toast, { notify } from "../elements/Toast";
import Input from "../elements/Input";
import { css } from "@emotion/react";
import Button from "../elements/Button";

interface InputRoundProps {
  [key: string]: string | number;
  number: string;
  strike: number;
  ball: number;
  out: number;
}

const Game = () => {
  const navigation = useNavigate();

  const { count, round, answer } = useRecoilValue(getGameOptionState);
  const [input, setInput] = useState("");
  const [inputRound, setInputRound] = useState<InputRoundProps[]>([]);
  const [end, setEnd] = useState(false);

  useEffect(() => {
    if (answer.length === 0) {
      navigation("/option");
    }
  }, []);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length > count) {
      return;
    } else {
      setInput(value);
    }
  };

  const submit = () => {
    // 현재 라운드 > 총 라운드인 경우
    if (inputRound.length >= round) {
      setEnd(true);
      notify({
        type: "error",
        text: `${inputRound.length}라운드까지 정답을 맞추지 못하셨습니다😢 게임이 종료됩니다.`,
      });
      return;
    }

    // 중복된 숫자를 입력한 경우
    const sameAnswer = inputRound.some((item) => item.number === input);

    if (sameAnswer) {
      notify({
        type: "error",
        text: "동일한 숫자는 입력이 불가합니다.",
      });
      setInput("");
      return;
    }

    const strikeCount = answer.filter(
      (item, i) => Number(input.split("")[i]) === item
    ).length;

    if (strikeCount === count) {
      setEnd(true);
      notify({
        type: "success",
        text: `${round}라운드 중 ${
          inputRound.length + 1
        }라운드에 정답을 맞추셨습니다.🥳`,
      });
    }

    const ballCount = input
      .split("")
      .filter(
        (item, i) => answer[i] !== Number(item) && answer.includes(Number(item))
      ).length;

    const outCount = count - (strikeCount + ballCount);

    const log = {
      number: input,
      strike: strikeCount,
      ball: ballCount,
      out: outCount,
    };

    setInputRound((prev) => {
      return [...prev, log];
    });
    setInput("");
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
        {inputRound.length <= 10 && end ? answer : answer.map((_) => "_ ")}
      </h1>
      <p
        css={css`
          margin-top: 0;
          text-align: center;
        `}
      >
        (현재 라운드 : {inputRound.length}/{round})
      </p>
      <LogList lengthYN={inputRound.length > 0}>
        {inputRound.map((item) => (
          <React.Fragment key={item.number}>
            <LogItem>
              <strong>{item.number}</strong>
              <hr />
              Strike : <strong>{item.strike}</strong> | Ball :{" "}
              <strong>{item.ball}</strong> | Out : <strong>{item.out}</strong>
            </LogItem>
          </React.Fragment>
        ))}
      </LogList>
      <Input
        type="number"
        name="count"
        onChange={inputHandler}
        value={input}
        placeholder={`${count}개의 숫자를 입력해주세요.`}
        enter={submit}
      />
      <div>
        <Button onClick={submit} disabled={end}>
          제출하기
        </Button>
        <Button
          onClick={() => {
            if (end) {
              navigation("/");
            } else {
              navigation("/option");
            }
          }}
        >
          {end ? "메인으로" : "뒤로가기"}
        </Button>
      </div>
      <Toast />
    </div>
  );
};

const LogList = styled.div<{ lengthYN: boolean }>`
  max-height: 300px;
  overflow: auto;
  padding: 10px;
  border-radius: 15px;
  background: ${({ lengthYN }) =>
    lengthYN ? "rgba(238, 238, 238, 0.5)" : "white"};
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
