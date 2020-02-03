const express = require('express');
const router = express.Router();

const passport = require('passport');

module.exports = router;

//login
router.get('/', (req,res) =>{
    res.render('../views/user/login.hbs');
}); 

/*router.post('/', ( req, res, next) =>{
    passport.authenticate('local.signin',{
        successRedirect: '/usuario/mis_cursos',
        failureRedirect: '/',
        failureFlash: true
    });(req,res,next)
});*/

router.post('/', passport.authenticate('local.signin', {
    successRedirect: '/usuario/mis_cursos',
    failureRedirect: '/',
    failureFlash: true
}))