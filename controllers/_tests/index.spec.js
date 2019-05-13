const assert = require('assert');
const sinon = require('sinon');
const indexController = require('../index');

describe('indexController', () => {
  describe('get: /', () => {
    const res = {
      render: sinon.spy(),
    };

    indexController.getIndex(null, res);

    it('1度だけ呼ばれる', () => {
      assert(res.render.calledOnce);
    });

    it('引数', () => {
      const [view, options] = res.render.args[0];

      assert.strictEqual('index', view);
      assert.strictEqual('Express', options.title);
    });
  });
});
