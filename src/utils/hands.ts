const ranks = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

const allHandsFlat = [
  'AA', 'AKo', 'AQo', 'AJo', 'ATo', 'A9o', 'A8o', 'A7o', 'A6o', 'A5o', 'A4o', 'A3o', 'A2o', 'AKs', 'KK',
  'KQo', 'KJo', 'KTo', 'K9o', 'K8o', 'K7o', 'K6o', 'K5o', 'K4o', 'K3o', 'K2o', 'AQs', 'KQs', 'QQ', 'QJo',
  'QTo', 'Q9o', 'Q8o', 'Q7o', 'Q6o', 'Q5o', 'Q4o', 'Q3o', 'Q2o', 'AJs', 'KJs', 'QJs', 'JJ', 'JTo', 'J9o',
  'J8o', 'J7o', 'J6o', 'J5o', 'J4o', 'J3o', 'J2o', 'ATs', 'KTs', 'QTs', 'JTs', 'TT', 'T9o', 'T8o', 'T7o',
  'T6o', 'T5o', 'T4o', 'T3o', 'T2o', 'A9s', 'K9s', 'Q9s', 'J9s', 'T9s', '99', '98o', '97o', '96o', '95o',
  '94o', '93o', '92o', 'A8s', 'K8s', 'Q8s', 'J8s', 'T8s', '98s', '88', '87o', '86o', '85o', '84o', '83o',
  '82o', 'A7s', 'K7s', 'Q7s', 'J7s', 'T7s', '97s', '87s', '77', '76o', '75o', '74o', '73o', '72o', 'A6s',
  'K6s', 'Q6s', 'J6s', 'T6s', '96s', '86s', '76s', '66', '65o', '64o', '63o', '62o', 'A5s', 'K5s', 'Q5s',
  'J5s', 'T5s', '95s', '85s', '75s', '65s', '55', '54o', '53o', '52o', 'A4s', 'K4s', 'Q4s', 'J4s', 'T4s',
  '94s', '84s', '74s', '64s', '54s', '44', '43o', '42o', 'A3s', 'K3s', 'Q3s', 'J3s', 'T3s', '93s', '83s',
  '73s', '63s', '53s', '43s', '33', '32o', 'A2s', 'K2s', 'Q2s', 'J2s', 'T2s', '92s', '82s', '72s', '62s',
  '52s', '42s', '32s', '22',
];

const allHandsRanked = [
  'AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', 'AKs', 'AQs', '77', 'AJs', 'AKo', 'ATs', 'AQo', 'AJo', 'A9s',
  'KQs', 'KJs', 'ATo', '66', 'A8s', 'A7s', 'KTs', 'A6s', 'A5s', 'KQo', 'KJo', 'A9o', 'A4s', 'K9s', 'QJs',
  'QTs', 'KTo', 'A8o', '55', 'A3s', 'K8s', 'A7o', 'A5o', 'A2s', 'K7s', 'Q9s', 'JTs', 'QJo', 'QTo', 'K9o',
  'A6o', 'A4o', 'K6s', 'K5s', 'Q8s', 'K8o', 'A3o', '44', 'K4s', 'J9s', 'JTo', 'Q9o', 'K7o', 'A2o', 'K3s',
  'Q7s', 'J8s', 'T9s', 'K6o', 'K2s', 'Q6s', 'Q5s', 'J9o', 'Q8o', 'K5o', '33', 'Q4s', 'J7s', 'T8s', 'Q7o',
  'K4o', 'K3o', 'Q3s', 'J6s', 'T7s', '98s', 'T9o', 'J8o', 'Q6o', 'K2o', 'Q2s', 'J5s', 'T8o', 'J7o', 'Q5o',
  'J4s', 'T6s', '97s', 'Q4o', '22', 'J2s', 'J3s', '87s', '96s', '98o', 'T7o', 'J6o', 'Q3o', 'T4s', 'T5s',
  '86s', 'J5o', 'Q2o', 'T3s', '95s', '76s', '97o', 'T6o', 'J4o', 'J3o', 'T2s', '85s', '87o', '96o', 'T5o',
  'J2o', '94s', '93s', '75s', '65s', '86o', 'T4o', '92s', '84s', '74s', '76o', '95o', 'T3o', '64s', '54s',
  '85o', 'T2o', '83s', '82s', '73s', '53s', '75o', '65o', '94o', '93o', '63s', '43s', '84o', '92o', '72s',
  '52s', '74o', '64o', '54o', '62s', '42s', '83o', '82o', '73o', '63o', '53o', '32s', '43o', '72o', '62o',
  '52o', '42o', '32o',
];

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
  allHandsFlat,
  allHandsRanked,
  methods: {
    allHands,
    transformRange,
  },
};
