import { useNavigate } from "react-router-dom";
import Button from "../elements/Button";

const Rules = () => {
  const navigation = useNavigate();

  return (
    <div>
      <h2>Game Rules</h2>
      <ul>
        <li>게임을 진행할 숫자 갯수를 선택한다.</li>
        <li>중복되지 않은 숫자를 랜덤으로 생성 받는다.</li>
        <li>게임을 시작한다.</li>
        <li>
          사용자가 숫자를 입력하면 정답 숫자와 사용자가 입력한 숫자를 비교한다.
          <br />
          (아래 조건에 맞춰 비교한다.)
        </li>
        <ul>
          <li>
            숫자 포함 / 위치 일치 = 1 Strike 숫자 포함 / 위치 불일치 = 1 Ball
            숫자
          </li>
          <li>
            미포함 = 1 Out 10 라운드까지 진행하고, 그때까지 정답을 맞추지 못하면
          </li>
          <li>게임 실패 10 라운드 이내에 정답을 맞추면 게임 성공</li>
        </ul>
      </ul>
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
