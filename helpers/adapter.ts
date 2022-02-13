export const collectionToArray = <T>(data: { [key: string]: T }) => {
  const result = Object.entries(data).map(([id, item]) => {
    return {
      id,
      ...item,
    };
  });

  return result;
};
