const ranks = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

const allHands = () => {
  const all: string[][] = [];
  for (let i = 0; i < ranks.length; i += 1) {
    all.push([]);
    for (let j = 0; j < ranks.length; j += 1) {
      if (i === j) {
        all[all.length - 1].push(ranks[i] + ranks[j]);
      } else if (i < j) {
        all[all.length - 1].push(`${ranks[i] + ranks[j]}o`);
      } else if (i > j) {
        all[all.length - 1].push(`${ranks[j] + ranks[i]}s`);
      }
    }
  }
  return all;
};

/**
 *
 * @param {string[]} hands representing the player's range
 * @returns range of cards
 */
const transformRange = (range: string[]) => range.reduce<string[]>((arr, r) => {
  const [first, second, opt] = r.split('');
  if (first === second) {
    arr.push(`${first}h${second}s`, `${first}h${second}d`, `${first}h${second}c`, `${first}s${second}d`, `${first}s${second}c`, `${first}d${second}c`);
  } else if (opt === 's') {
    arr.push(`${first}s${second}s`, `${first}h${second}h`, `${first}c${second}c`, `${first}d${second}d`);
  } else if (opt === 'o') {
    arr.push(`${first}h${second}s`, `${first}h${second}d`, `${first}h${second}c`,
      `${first}s${second}d`, `${first}s${second}c`,
      `${first}d${second}c`,
      `${second}h${first}s`, `${second}h${first}d`, `${second}h${first}c`,
      `${second}s${first}d`, `${second}s${first}c`,
      `${second}d${first}c`);
  }

  return arr;
}, []);

export default {
  methods: {
    allHands,
    transformRange,
  },
};
