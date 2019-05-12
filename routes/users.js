const express = require('express');
const UserModel = require('../models/usersModel');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const users = await UserModel
    .find(null, null, { sort: 'id' })
    .exec();

  res.render('users', {
    users,
  });
});

router.get('/:userId(\\d+)', async (req, res, next) => {
  const userId = Number(req.params.userId);
  const result = await UserModel
    .findOne({ id: userId })
    .exec();
  const userData = result && result._doc;

  if (!userData) {
    next({ message: 'No User Found' });
    return;
  }

  Object.entries(userData).forEach(([key, val]) => {
    if (val.toString() !== '[object Object]') return;

    // 値がオブジェクトの場合、文字列に変換
    userData[key] = Object.entries(val)
      .filter(([k, v]) => typeof v === 'string') // geo 除外
      .map(([k, v]) => `${k}: ${v}`)
      .join('<br>');
  });

  res.render('users-detail', {
    userData,
  });
});

module.exports = router;
