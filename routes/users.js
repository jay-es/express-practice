var express = require('express');
var router = express.Router();
const userModel = require('../models/usersModel');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users', {
    users: userModel.getSummery(),
  });
});

router.get('/:id', function(req, res, next) {
  const userId = Number(req.params.id);
  const userData = userModel.findById(userId);

  if (!userData) {
    next({ message: 'No User Found' });
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
