const router= require('express').router();
// sets user and thoughts routes
const userRoute = require('./usersRoutes');
const thoughtRoute = require('./thoughtsRoutes');
// add users to created routes
router.use('/User', userRoute);
// add thoughts to created routes
router.use('/Thoughts', thoughtRoute);

module.exports = router;