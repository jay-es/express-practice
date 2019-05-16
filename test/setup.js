/* eslint-env mocha */
const db = require('../dist/db').default;

before(db.open);
after(db.close);
