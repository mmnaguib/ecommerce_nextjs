export const truncateTxt = (text: string) => {
  return text.length < 25 ? text : text.substring(0, 25) + "...";
};
