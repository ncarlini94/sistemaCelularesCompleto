const express = require('express');
const router = express.Router();
const {getAdministrator,
    getAllAdministrators,
    deleteAdministrator,
    updateAdministrator,
    changePassword
} = require('./../controllers/administrator.Controller')
const { authRequired } = require('./../middlewares/validateToken')


router.get('/administrator', authRequired, getAdministrator);
router.get('/administrators', authRequired, getAllAdministrators);
router.delete('/administrator/:id', authRequired, deleteAdministrator);
router.put('/administrator/:id', authRequired, updateAdministrator);
router.put('/changePassword/:id', authRequired, changePassword)


module.exports = router;