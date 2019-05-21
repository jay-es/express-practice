import assert from 'assert';
import commentModel, { Model } from '../commentModel';
import commentsTable from './tables/commentsTable';

describe('commentModel', () => {
  before(async () => {
    await Model.deleteMany({});
    await Model.insertMany(commentsTable);
  });

  describe('getCommentsByPostId', () => {
    it('postにひもづくコメントを取得', async () => {
      const comments = await commentModel.getCommentsByPostId(1);

      assert.strictEqual(comments.length, 5);
    });
  });

  describe('postComment', () => {
    it('登録すると1件増える', async () => {
      const postId = 1;
      const oldComments = await commentModel.getCommentsByPostId(postId);
      await commentModel.postComment(postId, 'nnn', 'eee', 'bbb');
      const newComments = await commentModel.getCommentsByPostId(postId);

      assert.strictEqual(newComments.length - oldComments.length, 1);
    });

    it('対象のpostがなければエラー', async () => {
      await assert.rejects(commentModel.postComment(0, 'nnn', 'eee', 'bbb'));
    });

    it('引数が空だとエラー', async () => {
      await assert.rejects(commentModel.postComment(1, '', 'eee', 'bbb'));
      await assert.rejects(commentModel.postComment(1, 'nnn', '', 'bbb'));
      await assert.rejects(commentModel.postComment(1, 'nnn', 'eee', ''));
    });
  });
});
