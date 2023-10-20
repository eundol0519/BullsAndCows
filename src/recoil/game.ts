import { atom, selector } from "recoil";

export const canvasShowYNState = atom({
  key: "canvasShowYNState",
  default: false,
});

export const getCanvasShowYNState = selector({
  key: "getCanvasShowYNState",
  get: ({ get }) => {
    return get(canvasShowYNState);
  },
});
