import fs from 'fs';

const readFileSync: typeof fs.readFileSync = fs.readFileSync;
readFileSync('package.json');

interface User {
  name: string;
  id: number;
}

class UserAccount {
  static STATIC_VARIABLE = 'test';

  name: string;
  id: number;

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}

const user: User = new UserAccount('Murphy', 1);

type MyBool = true | false;
type WindowStates = 'open' | 'closed' | 'minimized';
type LockStates = 'locked' | 'unlocked';
type OddNumbersUnderTen = 1 | 3 | 5 | 7 | 9;

type StringArray = Array<string>;
type NumberArray = Array<number>;
type ObjectWithNameArray = Array<{ name: string }>;

interface Point {
  x: number;
  y: number;
}
const p: Point = { x: 0, y: 0 };

interface ExtendedPoint extends Point {
  z: number;
}

function printPoint(p: Point) {
  console.log(`${p.x as StringArray}, ${p.y}`);
}

enum UserResponse {
  No = 0,
  Yes = 1,
}

function respond(recipient: string, message: UserResponse): void {
  // ...
}

respond('Princess \n Caroline', UserResponse.Yes);

// Not much else we can assign to these variables!
let u: undefined = undefined;
let n: null = null;

// Function returning never must not have a reachable end point
function error(message: string): never {
  throw new Error(message);
}

let sym1 = Symbol();

let regexp = /some-(regexp)[a-z]+/;

const c = 'c';
const d = 'd' as const;

const record = {
  a: 'a',
  b: 'b',
  [c]: c,
  d,
  e: c,
  f: c,
};

type RecordKeys = keyof typeof user;
