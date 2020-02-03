const express = require('express');
const router = express.Router();

const conex = require('../database');

router.get('/mis_cursos',async (req,res) => {
    const mycourses = await conex.query("select *from cursos where course_status = 'active'");
    console.log(mycourses);
    res.render('../views/user/mycourses.hbs', {mycourses});
    //res.render('../views/user/mycourses.hbs');
});

module.exports = router;