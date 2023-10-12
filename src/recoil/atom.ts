import { atom, selector } from "recoil";

export const userInfoState = atom({
  key: "test",
  default: {},
});

export const getUserInfoState = selector({
  key: "testState",
  get: ({ get }) => {
    return get(userInfoState);
  },
});
