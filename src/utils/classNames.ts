// export default function classNames(...args: any[]) {
//   return args
//     .reduce((acc, val) => {
//       if (typeof val === "string") {
//         return acc.concat(val.split(" "));
//       }
//       return acc.concat(Object.values(val));
//     }, [])
//     .join(" ");
// }

export default function classNames(
  ...args: (string | Record<string, boolean>)[]
): string {
  return args
    .reduce<string[]>((acc, val) => {
      if (typeof val === "string") {
        return acc.concat(val.split(" "));
      }
      return acc.concat(
        Object.entries(val)
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .filter(([_, v]) => v)
          .map(([k]) => k)
      );
    }, [])
    .join(" ");
}
