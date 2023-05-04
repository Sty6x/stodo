export const formControl = (setter, condition) => {
  console.log(condition)
  return condition ? setter(false) : setter(true);
};
