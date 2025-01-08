import { isDeepEqual } from "../setaps/deepEqual";

function isDeepEqualBy(
  obj1: Record<string, any>,
  obj2: Record<string, any>,
  template: string[]
) {
  let result = true;

  template.forEach((key) => {
    if (!result) {
      return;
    }

    if (obj1[key] !== null && obj2[key] !== null) {
      if (typeof obj1[key] === "object" && typeof obj2[key] === "object") {
        result = isDeepEqual(obj1[key], obj2[key]);
      } else {
        result = obj1[key] !== obj2[key];
      }
    }
  });
  return result;
}

export default isDeepEqualBy;
