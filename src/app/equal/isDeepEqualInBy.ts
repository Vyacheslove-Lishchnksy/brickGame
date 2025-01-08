import isDeepEqualBy from "./isDeepEqualBy";

function isDeepEqualInBy(
  arr: Record<string, unknown>[],
  obj: Record<string, unknown>,
  template: string[]
) {
  let result = false;

  arr.forEach((item) => {
    if (result) {
      return;
    }

    if (isDeepEqualBy(item, obj, template)) {
      result = true;
    }
  });

  return result;
}

export default isDeepEqualInBy;
