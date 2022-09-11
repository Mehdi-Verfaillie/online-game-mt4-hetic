import { letters } from '@/constants/letters';

/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (typeof value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

/**
 * "Return a random element from the given array."
 *
 * The function takes an array of strings as an argument. It returns a random element from
 * the array
 * @param list - ReadonlyArray<string>
 * @returns A random item from the array.
 */
export const randomFromArray = (list: ReadonlyArray<string>) => {
  return list[Math.floor(Math.random() * list.length)].toLowerCase();
};

/**
 * Remove an element from an array at a specific index
 */
export const remove = <T>(indexToDrop: number) => {
  return {
    from: (list: T[]) => list.splice(indexToDrop, 1),
  };
};
