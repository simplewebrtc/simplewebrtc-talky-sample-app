// Setup those cool as h*ck room names.
const preps = ['on', 'beside', 'in', 'beneath', 'above', 'under', 'by', 'over', 'against', 'near'];

const adjectives = [
  'autumn',
  'hidden',
  'bitter',
  'misty',
  'silent',
  'empty',
  'dry',
  'dark',
  'summer',
  'icy',
  'delicate',
  'quiet',
  'white',
  'cool',
  'spring',
  'winter',
  'patient',
  'twilight',
  'dawn',
  'crimson',
  'wispy',
  'weathered',
  'blue',
  'billowing',
  'broken',
  'cold',
  'falling',
  'frosty',
  'green',
  'long',
  'late',
  'lingering',
  'bold',
  'little',
  'morning',
  'muddy',
  'old',
  'red',
  'rough',
  'still',
  'small',
  'sparkling',
  'shy',
  'wandering',
  'withered',
  'wild',
  'black',
  'young',
  'holy',
  'solitary',
  'fragrant',
  'aged',
  'snowy',
  'proud',
  'floral',
  'restless',
  'divine',
  'polished',
  'ancient',
  'purple',
  'lively',
  'nameless'
];

const nouns = [
  'waterfall',
  'river',
  'breeze',
  'moon',
  'rain',
  'wind',
  'sea',
  'morning',
  'snow',
  'lake',
  'sunset',
  'pine',
  'shadow',
  'leaf',
  'dawn',
  'glitter',
  'forest',
  'hill',
  'cloud',
  'meadow',
  'sun',
  'glade',
  'bird',
  'brook',
  'butterfly',
  'bush',
  'dew',
  'dust',
  'field',
  'fire',
  'flower',
  'firefly',
  'feather',
  'grass',
  'haze',
  'mountain',
  'night',
  'pond',
  'darkness',
  'snowflake',
  'silence',
  'sound',
  'sky',
  'shape',
  'surf',
  'thunder',
  'violet',
  'water',
  'wildflower',
  'wave',
  'water',
  'resonance',
  'sun',
  'wood',
  'dream',
  'cherry',
  'tree',
  'fog',
  'frost',
  'voice',
  'paper',
  'frog',
  'smoke',
  'star'
];

// array of tuples of singular and plural forms of bread products
// do not add to this list it is canonically accurate
const breadProducts = [
  ['toast', 'pieces of toast'],
  ['muffin', 'muffins'],
  ['teacake', 'teacakes'],
  ['bun', 'buns'],
  ['bap', 'baps'],
  ['baguette', 'baguettes'],
  ['bagel', 'bagels'],
  ['croissant', 'croissants'],
  ['crumpet', 'crumpets'],
  ['pancake', 'pancakes'],
  ['potato cake', 'potato cakes'],
  ['hot cross bun', 'hot cross buns'],
  ['flapjack', 'flapjacks'],
  ['waffle', 'waffles'],
  ['cheese and ham breville', 'cheese and ham brevilles'],
  ['toasted teacake', 'toasted teacakes'],
  ['brioche', 'brioches'],
  ['cornbread', 'pieces of cornbread'],
  ['yeast bread', 'yeast breads'],
  ['flat bread', 'flat breads'],
  ['sweet bread', 'sweet breads'],
  ['fruit bread', 'fruit breads'],
  ['rye', 'ryes'],
  ['soda bread', 'soda breads'],
  ['breadstick', 'breadsticks'],
  ['burger bun', 'burger buns'],
  ['chapati', 'chapatis'],
  ['ciabatta', 'ciabattas'],
  ['cracker', 'crackers'],
  ['crepe', 'crepes'],
  ['donut', 'donuts'],
  ['pan au chocolate', 'pans au chocolate']
];

// More than one
const numbers = [
  'a couple',
  'a few',
  'two',
  'three',
  'four',
  'five',
  'six',
  'half a dozen',
  'seven',
  'eight',
  'nine',
  'ten',
  'eleven',
  'a dozen',
  'twelve'
];

function random<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomTraditionalName(): string {
  const prep = random(preps);
  const adjective = random(adjectives);
  const noun = random(nouns);

  return [prep, 'a', adjective, noun]
    .join('-')
    .replace(/\s/g, '-')
    .replace(/-a-(a|e|i|o|u)/, '-an-$1');
}

function randomBreadName(): string {
  const amount = random(numbers);
  const pluralBreadProduct = random(breadProducts)[1];
  const article = random(['a', 'one']);
  const singularBreadProduct = random(breadProducts)[0];

  return [amount, pluralBreadProduct, 'and', article, singularBreadProduct]
    .join('-')
    .replace(/\s/g, '-');
}

function randomRoomName(): string {
  if (Math.floor(Math.random() * 5) > 1) {
    return randomTraditionalName();
  } else {
    return randomBreadName();
  }
}

export default randomRoomName;
