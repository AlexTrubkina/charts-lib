export const countMax = (
  coords: { x: number; y: number }[],
  coord: "x" | "y"
): number => {
  const coordsArray = coords.map((item) => item[coord]);
  return Math.max.apply(null, coordsArray);
};
