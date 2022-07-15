const router= require('express').router();

const userRoute = require('./usersRoutes');
const thoughtRoute = require('./thoughtsRoutes');

router.use('/User', userRoute);

router.use('/Thoughts', thoughtRoute);

module.exports = router;