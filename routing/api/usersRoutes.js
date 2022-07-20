const router = require('express').router();
// setting requirements
const {
    userCreate,
    userGatherAll,
    userGatherById,
    userUpdate,
    userDelete,
    addAFriend,
    deleteAFriend
} = require('../../controllers/usersController');
// get post for users
router.route('/')
    .get(userGatherAll)
    .post(userCreate);
// get/post/delete for usersID
router.route('/:id')
    .get(userGatherById)
    .put(userUpdate)
    .delete(userDelete);
// post/delete friends
router.route('/:id/friends/:friendsId')
    .post(addAFriend)
    .delete(deleteAFriend);

module.exports = router;