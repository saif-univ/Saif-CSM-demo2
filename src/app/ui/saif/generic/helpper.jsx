export function deepCopy(obj) {
  //   if (obj === null || typeof obj !== "object") {
  //     return obj;
  //   }

  //   if (Array.isArray(obj)) {
  //     return obj.map((item) => deepCopy(item));
  //   }

  //   const copiedObj = {};
  //   for (const key in obj) {
  //     if (obj.hasOwnProperty(key)) {
  //       copiedObj[key] = deepCopy(obj[key]);
  //     }
  //   }
  //   return copiedObj;
  return JSON.parse(JSON.stringify(obj));
}
