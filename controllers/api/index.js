const router = require('express').Router();
const userRoutes = require('./userRoutes');
const carRoutes = require('./carRoutes');

router.use('/user', userRoutes);
router.use('/car', carRoutes);

module.exports = router;