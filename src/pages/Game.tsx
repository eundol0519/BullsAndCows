import { useNavigate } from "react-router-dom";

const Game = () => {
  const navigation = useNavigate();

  return (
    <div>
      <div className="rules">
        <h3>👉 게임 시작</h3>
      </div>
      <button
        onClick={() => {
          navigation(-1);
        }}
      >
        뒤로가기
      </button>
    </div>
  );
};

export default Game;
