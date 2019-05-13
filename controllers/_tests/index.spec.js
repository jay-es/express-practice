const assert = require('assert');
const sinon = require('sinon');
const indexController = require('../index');

describe('indexController', () => {
  describe('get: /', () => {
    const res = {
      render: sinon.spy(),
    };

    indexController.getIndex(null, res);

    it('renderは1度だけ呼ばれる', () => {
      assert(res.render.calledOnce);
    });

    it('render引数: viewファイル名', () => {
      const [view] = res.render.args[0];

      assert.strictEqual('index', view);
    });

    it('render引数: title', () => {
      const [, options] = res.render.args[0];

      assert.strictEqual('Express', options.title);
    });
  });
});
