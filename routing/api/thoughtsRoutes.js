const router = require('express').Router();
// setting requirements
const {
    thoughtsCreate,
    thoughtsGather,
    thoughtsGatherById,
    thoughtsUpdate,
    thoughtsDelete,
    reactionCreate,
    reactionDelete
} = require('../../controllers/thoughtsController');
//directs get routes for thoughts
router.route('/')
    .get(thoughtsGather);
// allows get pull delete
router.route('/:id')
    .get(thoughtsGatherById)
    .put(thoughtsUpdate)
    .delete(thoughtsDelete);
// allows post to userID
router.route('/:userId')
    .post(thoughtsCreate);
// allows post to create thought ID
router.route('/:thoughtId/reaction')
    .post(reactionCreate);
// allows deletion of reactions
router.route('/:thoughtId/reaction/:reactId')
    .delete(reactionDelete);

module.exports = router;