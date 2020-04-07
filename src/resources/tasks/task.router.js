const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');

//= ===========
// GET
//= ===========
router.route('/').get(async (req, res) => {
  const tasks = await tasksService.getAll(req.boardId);
  // map task fields
  res.json(tasks.map(Task.toResponse));
});

//= ===========
// GET by id
//= ===========

router.route('/:id').get(async (req, res) => {
  const task = await tasksService.getById(req.params.id);

  if (!task) {
    res.status(404);
    res.json([{}]);
  } else {
    res.json(Task.toResponse(task));
  }
});

//= ===========
// DELETE
//= ===========
router.route('/:id').delete(async (req, res) => {
  const result = await tasksService.deleteById(req.params.id);

  if (!result.status) {
    res.status(204);
  }

  res.send(result.message);
});

//= ===========
// POST
//= ===========
router.route('/').post(
  async (req, res, next) => {
    const result = Task.checkTask(req.body);

    if (!result.status) {
      res.status(400);
      res.send(result.message);
    } else {
      next();
    }
  },
  async (req, res) => {
    
    const result = await tasksService.createTask(req.boardId, req.body);

    if (!result.status) {
      res.status(500);
    }
    res.json(Task.toResponse(result.task));
  }
);

//= ===========
// PUT
//= ===========
router.route('/:id').put(
  async (req, res, next) => {
    const result = Task.checkTask(req.body);

    if (!result.status) {
      res.status(400);
      res.send(result.message);
    } else {
      next();
    }
  },
  async (req, res) => {
    const result = await tasksService.updateTask(req.params.id, req.body);

    if (!result.status) {
      res.status(404);
    }
    res.json(Task.toResponse(result.task));
  }
);

module.exports = router;
