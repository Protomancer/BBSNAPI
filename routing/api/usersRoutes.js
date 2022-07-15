const router = require('express').router();

const {
    userCreate,
    userGatherAll,
    userGatherById,
    userUpdate,
    userDelete,
    addAFriend,
    deleteAFriend
} = require('../../controllers/usersController');

router.route('/')
    .get(userGatherAll)
    .post(userCreate);

router.route('/:id')
    .get(userGatherById)
    .put(userUpdate)
    .delete(userDelete);

router.route('/:id/friends/:friendsId')
    .post(addAFriend)
    .delete(deleteAFriend);

module.exports = router;