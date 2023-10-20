import { atom, selector } from "recoil";

export const gameOptionState = atom({
  key: "gameOptionState",
  default: {
    count: 3,
    round: 10,
    answer: [],
  },
});

export const getGameOptionState = selector({
  key: "getGameOptionState",
  get: ({ get }) => {
    return get(gameOptionState);
  },
});
