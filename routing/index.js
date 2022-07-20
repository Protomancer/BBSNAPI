const router = require('express').router();
//import api routes
const innerApiRoutes = require('./api');
// adds api tag
router.use('/api',innerApiRoutes);

router.use((req,res) => {
    res.status(404).send('<h1> 404 Error </h1>');
});

module.exports = router;