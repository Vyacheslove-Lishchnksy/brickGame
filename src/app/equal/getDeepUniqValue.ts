import { isDeepEqualIn } from "../setaps/deepEqual";

function getDeepUniqValue<T extends Record<string, any>>(arr: T[]): T[] {
  const result: T[] = [];
  console.log("=============");
  arr.forEach((item) => {
    if (!isDeepEqualIn<T>(result, item)) {
      // console.log(item);

      result.push(item);
    }
  });

  return result;
}

export default getDeepUniqValue;
