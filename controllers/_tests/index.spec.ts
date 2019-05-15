import assert from 'assert';
import indexController from '../index';
import createArgs from './_util';

describe('indexController', () => {
  describe('get: /', () => {
    const { req, res, next } = createArgs();

    indexController.getIndex(req, res, next);

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
