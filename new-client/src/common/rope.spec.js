const CRATE_STATE_ENUM = require('./consts/crateEnum.js');


const test = require('tape');
const sinon = require('sinon');

const Rope = require('./rope');
const Crate = require('./crate');

test('setting crate', (t) => {

  const r = createRope();

  const crate = new Crate();
  const setStateMock = sinon.stub(crate, 'setState');

  r.setCrate(crate);
  t.equal(true, r.hasCrate());

  sinon.assert.calledWith(setStateMock, CRATE_STATE_ENUM.attached);

  r.setCrate(undefined);
  t.equal(false, r.hasCrate());

  t.end();
});


function createRope() {
  const startElement = {
    getX: () => {return 0;},
    getY: () => {return 0;}
  };

  return new Rope(startElement);
}