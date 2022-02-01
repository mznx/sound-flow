export function paramObjToQueryStr<T>(opts: T): string {
  let result = "";

  JSON.parse(JSON.stringify(opts), (key, val) => {
    result += `${key}=${val}&`;
  });

  return result;
}

export function msToTime(val: number): string {
  const min = Math.trunc(val / 60000);
  const sec = Math.trunc((val - min * 60000) / 1000);

  let sec_str = String(sec);
  if (sec < 10) sec_str = "0" + sec_str;

  return min + ":" + sec_str;
}
