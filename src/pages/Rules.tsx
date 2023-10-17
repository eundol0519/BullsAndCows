import { useNavigate } from "react-router-dom";
import Button from "../elements/Button";
import { css } from "@emotion/react";

const Rules = () => {
  const navigation = useNavigate();

  return (
    <div>
      <h2>Game Rules</h2>
      <ol>
        <li>
          게임 시작 전 게임 진행을 위한 옵션을 선택한다.
          <br />
          옵션에서는 숫자 개수, 라운드 수를 선택하게 된다.
        </li>
        <li>옵션 선택이 끝났다면 시작하기를 눌러 게임을 시작한다.</li>
        <li>
          기본적으로 10라운드로 진행되며, 옵션에서 최대 50라운드까지 설정할 수
          있다.
        </li>
        <li>
          숫자를 입력하면 아래의 조건에 맞춰 입력한 숫자와 결과가 계산된다.
        </li>
        <ul>
          <li>Strike : 숫자와 위치가 전부 맞을 경우</li>
          <li>Ball : 숫자는 맞지만 위치가 틀렸을 경우</li>
          <li>Out : 숫자와 위치가 전부 틀릴 경우</li>
        </ul>
        <li>
          설정한 라운드 내에 정답을 맞출 경우 성공, 맞추지 못할 경우 실패로
          게임을 마친다.
        </li>
        <br />
        <span
          css={css`
            color: red;
            margin-left: -20px;
            font-size: 14px;
          `}
        >
          ※ 정답은 0~9 사이에 중복되지 않은 랜덤 숫자입니다.
        </span>
      </ol>

      <Button
        onClick={() => {
          navigation("/");
        }}
      >
        뒤로가기
      </Button>
    </div>
  );
};

export default Rules;
