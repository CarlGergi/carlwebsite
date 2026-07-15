/**
 * Canvas color roles that follow the active theme. Read per frame — a
 * classList check is near-free and keeps every canvas in sync with the
 * toggle without re-renders.
 */
export function themeInk() {
  const light =
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("light");
  return light
    ? { ink: "28, 25, 23", brass: "161, 106, 27", light: true }
    : { ink: "237, 236, 232", brass: "217, 166, 72", light: false };
}
