export function isDeepEqual<T extends Record<string, any>>(
  obj1: T,
  obj2: T
): boolean {
  const result = { value: true };

  compareObjects(obj1, obj2, result);

  return result.value;
}

function compareObjects<T extends Record<string, any>>(
  obj1: T,
  obj2: T,
  result: { value: boolean }
): void {
  const contentOfObj1 = Object.entries(obj1);

  if (contentOfObj1.length === Object.keys(obj2).length && result.value) {
    contentOfObj1.forEach(([key, value]) => {
      if (typeof value === "object" && value !== null) {
        if (typeof obj2[key] === "object" && obj2[key] !== null) {
          compareObjects(
            value as Record<string, any>,
            obj2[key] as Record<string, any>,
            result
          );
        } else {
          result.value = false;
        }
      } else {
        if (!result.value) {
          return;
        } else {
          result.value = value === obj2[key];
        }
      }
    });
  } else {
    result.value = false;
  }
}
