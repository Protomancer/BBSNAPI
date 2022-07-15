const router = require('express').router();

const {
    thoughtsCreate,
    thoughtsGather,
    thoughtsGatherById,
    thoughtsUpdate,
    thoughtsDelete,
    reactionCreate,
    reactionDelete
} = require('../../controllers/thoughtsController');

router.route('/')
    .get(thoughtsGather);

router.route('/:id')
    .get(thoughtsGatherById)
    .put(thoughtsUpdate)
    .delete(thoughtsDelete);

router.route('/:userId')
    .post(thoughtsCreate);

router.route('/:thoughtId/reaction')
    .post(reactionCreate);

router.route('/:thoughtId/reaction/:reactId')
    .delete(reactionDelete);

module.exports = router;