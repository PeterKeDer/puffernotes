function padNumber(n) {
  return n < 10 ? `0${n}` : `${n}`;
}

export function msToTimeString(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  const secondsRemainder = seconds % 60;
  const minutesRemainder = minutes % 60;

  return `${padNumber(hours)}:${padNumber(minutesRemainder)}:${padNumber(secondsRemainder)}`;
}
