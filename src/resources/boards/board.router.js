const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

//= ===========
// GET
//= ===========
router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  // map board fields
  res.json(boards.map(Board.toResponse));
});

//= ===========
// GET by id
//= ===========

router.route('/:id').get(async (req, res) => {
  const board = await boardsService.getById(req.params.id);
  if (!board) {
    res.status(404);
    res.json([{}]);
  } else {
    res.json(Board.toResponse(board));
  }
});

//= ===========
// DELETE
//= ===========
router.route('/:id').delete(async (req, res) => {
  const result = await boardsService.deleteById(req.params.id);

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
    const result = Board.checkBoard(req.body);

    if (!result.status) {
      res.status(400);
      res.send(result.message);
    } else {
      next();
    }
  },
  async (req, res) => {
    const result = await boardsService.createBoard(req.body);
    if (!result.status) {
      res.status(500);
    }
    res.json(Board.toResponse(result.board));
  }
);

//= ===========
// PUT
//= ===========
router.route('/:id').put(
  async (req, res, next) => {
    const result = Board.checkBoard(req.body);

    if (!result.status) {
      res.status(400);
      res.send(result.message);
    } else {
      next();
    }
  },
  async (req, res) => {
    const result = await boardsService.updateBoard(req.params.id, req.body);

    if (!result.status) {
      res.status(404);
    }
    res.json(Board.toResponse(result.board));
  }
);

module.exports = router;
