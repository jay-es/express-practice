import assert from 'assert';
import commentService from '../commentService';
import CommentModel from '../../models/CommentModel';
import commentsTable from './tables/commentsTable';

describe('commentService', () => {
  before(async () => {
    await CommentModel.deleteMany({});
    await CommentModel.insertMany(commentsTable);
  });

  describe('getCommentsByPostId', () => {
    it('postにひもづくコメントを取得', async () => {
      const comments = await commentService.getCommentsByPostId(1);

      assert.strictEqual(comments.length, 5);
    });
  });

  describe('postCommentByPostId', () => {
    it('登録すると1件増える', async () => {
      const postId = 1;
      const oldComments = await commentService.getCommentsByPostId(postId);
      await commentService.postCommentByPostId(postId, 'nnn', 'eee', 'bbb');
      const newComments = await commentService.getCommentsByPostId(postId);

      assert.strictEqual(newComments.length - oldComments.length, 1);
    });

    it('対象のpostがなければエラー', async () => {
      await assert.rejects(commentService.postCommentByPostId(0, 'nnn', 'eee', 'bbb'));
    });

    it('引数が空だとエラー', async () => {
      await assert.rejects(commentService.postCommentByPostId(1, '', 'eee', 'bbb'));
      await assert.rejects(commentService.postCommentByPostId(1, 'nnn', '', 'bbb'));
      await assert.rejects(commentService.postCommentByPostId(1, 'nnn', 'eee', ''));
    });
  });
});
