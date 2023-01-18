export const debounce = (callback: Function, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: unknown[]) => {
    let result: any;
    clearTimeout(timer);
    const context = this;
    timer = setTimeout(() => {
      result = callback.apply(context, args);
    }, delay);
    return result;
  };
};
