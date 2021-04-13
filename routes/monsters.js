const {Router} = require('express');
const { route, request, response } = require('../app');
const router = Router();
const pool=require('../db');
router.get('/',(request,response,next) => {
    pool.query('SELECT * FROM monsters ORDER BY id ASC',(err,res) =>{
        /* Used next to pass the error to where it can handled? */
        // if (err) return console.log(err);
        if (err) return next (err);
        // console.log(res.rows)
        response.json(res.rows)
    });
});



router.get('/:id',(request,response,next)=>{
    const {id} = request.params;
/* Used the $=1 because the array will be indexed from 1 */
    pool.query('SELECT * FROM monsters WHERE id=$1 ',[id],(err,res)=>{
        if (err) return next(err);
        response.json(res.rows);
    });
});
//Add
router.post('/',(request,response,next)=>{
    const {name,personality}=request.body;

    pool.query(
        "INSERT INTO monsters(name,personality) VALUES($1,$2)",
        [name,personality],
        (err,res)=>{
            if (err) return next (err);
            response.redirect('/monsters')
        }
        )
});
//Update & partial update 
router.put('/:id',(request,response,next)=>{
    const {id}= request.params;
    const keys =["name","personality"];
    const fields=[];

    keys.forEach(key => {
        if (request.body[key]) fields.push(key);
    });
    fields.forEach((field,index)=>{
          pool.query(
        `UPDATE  monsters SET ${field}=($1) WHERE id=($2)`,
        [request.body[field],id],
        (err,res)=>{
            if (err) return next (err);
            if (index === fields.length - 1) response.redirect('/monsters');
        }
    );

    });
});


router.delete('/:id',(request,response,next)=>{
    const {id}=request.params;
    pool.query('DELETE FROM monsters WHERE id=$1',[id],(err,res)=>{
        if (err) return next(err);
        response.redirect('/monsters');
    });

});


module.exports = router;