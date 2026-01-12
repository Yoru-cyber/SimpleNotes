import { config as configBase } from "@tamagui/config/v3";
import { createTamagui, createTokens } from "@tamagui/core";
const tokens = createTokens({
  color: {
    black1: "#0A0A0A",
    black2: "#100D08",
    white1: "#fff",
    purple1: "#8700aa",
    purple2: "#780693",
    purple3: "#670b7c",
    purple4: "#561065",
    purple5: "#45154e",
    purple6: "#341a37",
  },
});
// const tokens =#100D08
const dark = {
  ...configBase.themes.dark,
  background: tokens.color.black1,
  foreground: tokens.color.black2,
  color: tokens.color.white1,
  accent: tokens.color.purple1,
  accentColorHover: tokens.color.purple2,
};

export const config = createTamagui({
  ...configBase,
  themes: {
    ...configBase.themes,
    dark,
  },
});

export type Conf = typeof config;
declare module "@tamagui/core" {
  interface TamaguiCustomConfig extends Conf {}
}
