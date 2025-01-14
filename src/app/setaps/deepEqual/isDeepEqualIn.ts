import { isDeepEqual } from "./isDeepEqual";

export function isDeepEqualIn<T extends Record<string, any>>(
  array: T[],
  obj: T
) {
  let result = array.length !== 0;
  console.log(result);

  array.forEach((item) => {
    if (!result) {
      return result;
    }
    result = isDeepEqual<T>(item, obj);
  });
  console.log(array, obj, result);

  return result;
}
