export function after(fn) {
  return function inner(...args) {
    const result = fn.apply(this, args);
    return result;
  };
}

export function groupAry(ary, count) {
  if (count === 0 || count >= ary.length) {
    return ary;
  }
  const { length } = ary;
  const newAry = [];
  let index = 0;
  while (index < length) {
    newAry.push(ary.slice(index, index + count));
    index += count;
  }

  if (index < length) {
    newAry.push(ary.slice(index));
  }

  return newAry;
}
export const ImageBaseURL = 'https://fuss10.elemecdn.com';

export const log = console.log.bind(console.log);
