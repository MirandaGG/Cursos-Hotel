const express = require('express');
const router = express.Router();

const conex = require('../database');

//agregar nuevo curso
router.get('/nuevo_curso', (req,res) => {
    res.render('../views/courses/addCourse.hbs');
});

router.post('/nuevo_curso', async (req, res) => {
    //console.log(req.body)
    const { title, category, description } = req.body;
    const newCourse = {
        title,
        category,
        description,
        course_status: "active" 
    };
    console.log(newCourse)
    await conex.query('INSERT INTO cursos SET ?', [newCourse]);
    res.redirect('/administrador/menu_cursos');
});
 
//agregar nuevo personal 
router.get('/nuevo_personal', (req,res) => {
    res.render('../views/admin/adminTeacher.hbs');
});

//menu principal del admin
router.get('/menu', (req,res) => {
    res.render('../views/admin/menu.hbs');
});

//MENU DE CURSOS
//ver los cursos activos y deshabilidatos
router.get('/menu_cursos', async (req,res) => {
    const activeCourses = await conex.query("select *from cursos where course_status = 'active'");
    const disableCourses = await conex.query("select *from cursos where course_status = 'disable'");
    //console.log(allCourses);
    res.render('../views/admin/menuCourses.hbs', {activeCourses,disableCourses});
});
//deshabilitar cursos
router.get('/disable/:id', async (req,res) => {
    const {id} = req.params;
    await conex.query("UPDATE cursos SET course_status ='disable' WHERE id = ?",[id]);
    req.flash('alert', 'Curso deshabilitado correctamente');
    res.redirect('/administrador/menu_cursos');
});
//habilitar cursos
router.get('/active/:id', async (req,res) => {
    const {id} = req.params;
    await conex.query("UPDATE cursos SET course_status ='active' WHERE id = ?",[id]);
    req.flash('alert', 'Curso habilitado correctamente');
    res.redirect('/administrador/menu_cursos');
});
//editar curso..carga el curso a editar
router.get('/edit/:id', async (req,res) => {
    const {id} = req.params;
    const editCourse = await conex.query("select *from cursos where id = ?",[id]);
    //console.log(editCourse[0])
    res.render('../views/courses/editCourses.hbs',{editCourse: editCourse[0]})
    console.log(editCourse);
    
});
//editar curso..edita los datos del curso en la db
router.post('/edit/:id', async (req, res) => {
    const { id, course_status } = req.params;
    const querystatus = await conex.query("select course_status from cursos where id = ?",[id]);
    var status = (JSON.stringify(querystatus[0].course_status));
    var statuscourse = status.replace(/\"/g, "");
    console.log(statuscourse);
    const { title, category, description } = req.body;
    const newCourse = {
        title,
        category,
        description,
        course_status: statuscourse
    };
    console.log(newCourse)
    await conex.query('UPDATE cursos set ? where id = ?', [newCourse, id]);
    req.flash('alert', 'Curso modificado correctamente');
    res.redirect('/administrador/menu_cursos');
});

module.exports = router;
