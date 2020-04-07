const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const tasksService = require('../tasks/task.service');

//= ===========
// GET
//= ===========
router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users.map(User.toResponse));
});

//= ===========
// GET by id
//= ===========

router.route('/:id').get(async (req, res) => {
  const user = await usersService.getById(req.params.id);
  if (!user) {
    res.status(404);
    res.json([{}]);
  } else {
    res.json(User.toResponse(user));
  }
});

//= ===========
// DELETE
//= ===========
router.route('/:id').delete(async (req, res) => {
  let result = await usersService.deleteById(req.params.id);

  if (!result.status) {
    res.status(204);
    res.send(result.message);
    return;
  }
  else{
    result = await tasksService.unassignByUserId(req.params.id);
    res.send("OK!");
  }
  
});

//= ===========
// POST
//= ===========
router.route('/').post(
  async (req, res, next) => {
    const result = User.checkUser(req.body);

    if (!result.status) {
      res.status(400);
      res.send(result.message);
    } else {
      next();
    }
  },
  async (req, res) => {
    const result = await usersService.createUser(req.body);
    if (!result.status) {
      res.status(500);
    }
    res.json(User.toResponse(result.user));
  }
);

//= ===========
// PUT
//= ===========
router.route('/:id').put(
  async (req, res, next) => {
    const result = User.checkUser(req.body);

    if (!result.status) {
      res.status(400);
      res.send(result.message);
    } else {
      next();
    }
  },
  async (req, res) => {
    const result = await usersService.updateUser(req.params.id, req.body);

    if (!result.status) {
      res.status(404);
    }
    res.json(User.toResponse(result.user));
  }
);

module.exports = router;
