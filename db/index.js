const { Pool }= require('pg');
const { user,host,database,password,port }=require('../secrets/db_configuration')
const pool = new Pool({ user,host,database,password,port}
    /* This method /below/ is not secure, thus created the db_configuraion */
//     {
//     user:'node_user',
//     host:'localhost',
//     database:'monstersdb',
//     password:'node_password',
//     port:5432
// }
);


module.exports=pool;