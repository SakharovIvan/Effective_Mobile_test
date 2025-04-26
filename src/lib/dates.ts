function createDateFromString(str: string,next:number=0): Date {
  const dateArray = str.split("-"); //YYYY-MM-DD
  const res = new Date(Date.UTC(
    Number(dateArray[0]),
    Number(dateArray[1]) -1,
    Number(dateArray[2])+next,
    0,
    0,
    0,
    0)
  );
  return res
}
export { createDateFromString };
