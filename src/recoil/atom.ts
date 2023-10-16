import { atom, selector } from "recoil";

export const gameOptionState = atom({
  key: "gameOptionState",
  default: {
    numberCount: 3,
    roundCount: 10,
    numbers: [],
  },
});

export const getGameOptionState = selector({
  key: "getGameOptionState",
  get: ({ get }) => {
    return get(gameOptionState);
  },
});
