/**
 * Convert play time to string
 * @param time Number of play time, the unit is 10
 * @returns String that contains minute and second
 */
export const convertPlayTimeToString = (time: number): string => {
  let minute = Math.floor(time / 600).toString();
  if (minute.length < 2) {
    minute = `0${minute}`;
  }

  let second = Math.floor((time % 600) / 10).toString();
  if (second.length < 2) {
    second = `0${second}`;
  }

  return `${minute} : ${second}`;
};
