import assert from 'assert';
import indexController from '../indexController';
import createArgs from './_util';

describe('indexController', () => {
  describe('get: /', () => {
    const { req, res, next } = createArgs();

    indexController.getIndex(req, res, next);

    it('renderは1度だけ呼ばれる', () => {
      assert(res.render.calledOnce);
    });

    it('render引数', () => {
      const [view, options] = res.render.args[0];

      assert.strictEqual(view, 'index');
      assert.strictEqual(options.title, 'Express');
    });
  });
});
