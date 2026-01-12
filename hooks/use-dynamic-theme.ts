// import { useColorScheme } from "@/hooks/use-color-scheme";
// import { storage } from "@/tamagui.config";
// import { config as baseConfig } from "@tamagui/config/v3";
// import { useMemo } from "react";

// const lightBase = baseConfig.themes.light;
// const darkBase = baseConfig.themes.dark;

// function lighten(hex: string, percent: number): string {
//   const bigint = parseInt(hex.slice(1), 16);
//   const r = (bigint >> 16) & 255;
//   const g = (bigint >> 8) & 255;
//   const b = bigint & 255;

//   const newR = Math.min(255, Math.max(0, r + (255 - r) * (percent / 100)));
//   const newG = Math.min(255, Math.max(0, g + (255 - g) * (percent / 100)));
//   const newB = Math.min(255, Math.max(0, b + (255 - b) * (percent / 100)));

//   return `#${Math.round(newR).toString(16).padStart(2, "0")}${Math.round(newG)
//     .toString(16)
//     .padStart(2, "0")}${Math.round(newB).toString(16).padStart(2, "0")}`;
// }

// function darken(hex: string, percent: number): string {
//   const bigint = parseInt(hex.slice(1), 16);
//   const r = (bigint >> 16) & 255;
//   const g = (bigint >> 8) & 255;
//   const b = bigint & 255;

//   const newR = Math.min(255, Math.max(0, r * (1 - percent / 100)));
//   const newG = Math.min(255, Math.max(0, g * (1 - percent / 100)));
//   const newB = Math.min(255, Math.max(0, b * (1 - percent / 100)));

//   return `#${Math.round(newR).toString(16).padStart(2, "0")}${Math.round(newG)
//     .toString(16)
//     .padStart(2, "0")}${Math.round(newB).toString(16).padStart(2, "0")}`;
// }

// export function useDynamicTheme() {
//   const colorScheme = useColorScheme();
//   const baseTheme = colorScheme === "dark" ? darkBase : lightBase;

//   const accent = storage.getString("accentColor") || "#ff0000";

//   const dynamicTheme = useMemo(() => {
//     return {
//       ...baseTheme,
//       accent,
//       accentHover: lighten(accent, 10),
//       accentPress: darken(accent, 10),
//       accentFocus: lighten(accent, 5),
//       brand: accent,
//     };
//   }, [colorScheme, accent]);

//   return { dynamicTheme };
// }
