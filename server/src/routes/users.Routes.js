const express = require('express');
const router = express.Router();
const {getUser,
    getAllUsers,
    deleteUser,
    updateUser,
    createUser,
    getUserHistory,
    getAllUsersForRol,
} = require('./../controllers/user.Controller')
const { authRequired } = require('./../middlewares/validateToken')


router.post('/user', authRequired,createUser)
router.get('/user/:id', authRequired, getUser);
router.get('/users', authRequired, getAllUsers);
router.get('/users/rol', authRequired, getAllUsersForRol);
router.delete('/user/:id', authRequired, deleteUser);
router.put('/user/:id', authRequired, updateUser);
router.get('/user/history/:id', authRequired, getUserHistory);


module.exports = router;