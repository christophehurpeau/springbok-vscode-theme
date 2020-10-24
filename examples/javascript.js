class UserAccount {
  type = 'type';

  constructor(name, id) {
    this.name = name;
    this.id = id;
  }
}

const booleanVariable = true;

const user = new UserAccount('Murphy', 1);

function printPoint(p) {
  console.log(`${p.x}, ${p.y}`);
}

/**
 * @param {string} recipient
 * @param {string} message
 */
function respond(recipient, message) {
  // ...
}

/*
 */
respond('Princess \n Caroline', 'yes');

// Not much else we can assign to these variables!
let u = undefined;
let n = null;

// Function returning never must not have a reachable end point
function error(message) {
  throw new Error(message);
}

console.log(process.env.NODE_ENV);

let sym1 = Symbol();

let regexp = /some-(regexp)[a-z]\\.+/;


/**
 * @deprecated do not use that
 */
const deprecatedMethod = () => {

};

deprecatedMethod();