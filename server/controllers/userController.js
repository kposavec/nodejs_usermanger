const mysql = require('mysql');

//Connestion pool
const pool = mysql.createPool({
    connectionLimit : 100,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});



//View Users 
exports.view = (req, res) =>{
    
    // Connection to DB
    pool.getConnection((err, connection) => {
        if(err) throw err; // not connected!
        console.log('Connected as ID ' + connection.threadId);

        //user the connection
        connection.query('SELECT * FROM user', (err, rows) => {
            // When done with the connection, release it 
            connection.release();
            
            if(!err) {
                let removedUser = req.query.removed;
                res.render('home', { rows, removedUser });
            } else {
                console.log(err)
            }

            console.log('The data from user table: \n', rows);

        });
    });
}


//Find User by Search
exports.find = (req, res) =>{
   
    // Connection to DB
    pool.getConnection((err, connection) => {
        if(err) throw err; // not connected!
        console.log('Connected as ID ' + connection.threadId);
        
        //uzima vrijednost koja je unesena na formi pod imenom search
        let searchTerm = req.body.search;
        

        //user the connection
        connection.query('SELECT * FROM user WHERE firstname LIKE ? OR lastname LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
            // When done with the connection, release it 
            connection.release();
            
            if(!err) {
                res.render('home', { rows });
            } else {
                console.log(err)
            }

            console.log('The data from user table: \n', rows);

        });
    });

}



exports.form = (req, res) =>{

    res.render('add-user');

}

//Add new user
exports.create = (req, res) =>{

    const { first_name, last_name, email, phone, comments } = req.body;

    // Connection to DB
    pool.getConnection((err, connection) => {
        if(err) throw err; // not connected!
        console.log('Connected as ID ' + connection.threadId);
        
        //uzima vrijednost koja je unesena na formi pod imenom search
        let searchTerm = req.body.search;
        

        //user the connection
        connection.query('INSERT INTO user SET firstname = ?, lastname = ?, email = ?, phone = ?, comment = ?',[first_name, last_name, email, phone, comments ], (err, rows) => {
            // When done with the connection, release it 
            connection.release();
            
            if(!err) {
                res.render('add-user', { alert: 'User added successefully' });
            } else {
                console.log(err)
            }

            console.log('The data from user table: \n', rows);

        });
    });

}


//Edit new user
exports.edit = (req, res) =>{

    // Connection to DB
     pool.getConnection((err, connection) => {
        if(err) throw err; // not connected!
        console.log('Connected as ID ' + connection.threadId);

        //user the connection
        connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
            // When done with the connection, release it 
            connection.release();
            
            if(!err) {
                res.render('edit-user', { rows });
            } else {
                console.log(err)
            }

            console.log('The data from user table: \n', rows);

        });
    });
}

//UPDATE user
exports.update = (req, res) =>{
    
    const { first_name, last_name, email, phone, comments } = req.body;

    // Connection to DB
     pool.getConnection((err, connection) => {
        if(err) throw err; // not connected!
        console.log('Connected as ID ' + connection.threadId);

        //user the connection
        connection.query('UPDATE user SET firstname = ?, lastname = ?, email = ?, phone = ?, comment = ? WHERE id = ?', [first_name, last_name, email, phone, comments, req.params.id], (err, rows) => {
            // When done with the connection, release it 
            connection.release();
            
            if(!err) {
                
                    // Connection to DB
                    pool.getConnection((err, connection) => {
                        if(err) throw err; // not connected!
                        console.log('Connected as ID ' + connection.threadId);

                        //user the connection
                        connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
                            // When done with the connection, release it 
                            connection.release();
                            
                            if(!err) {
                                res.render('edit-user', { rows, alert: `${first_name} has benn update!` });
                            } else {
                                console.log(err)
                            }

                            console.log('The data from user table: \n', rows);

                        });
                    });
                
            } else {
                console.log(err)
            }

            console.log('The data from user table: \n', rows);

        });
    });
}

//Delete new user
exports.delete = (req, res) =>{

    // Connection to DB
     pool.getConnection((err, connection) => {
        if(err) throw err; // not connected!
        console.log('Connected as ID ' + connection.threadId);

        //user the connection
        connection.query('DELETE FROM user WHERE id = ?', [req.params.id], (err, rows) => {
            // When done with the connection, release it 
            connection.release();
            
            if(!err) {
                let removeUser = encodeURIComponent('User successeflly remov');
                res.redirect('/?removed=' + removeUser);
            } else {
                console.log(err)
            }

            console.log('The data from user table: \n', rows);

        });
    });
}

//view user
exports.viewuser = (req, res) =>{

    // Connection to DB
     pool.getConnection((err, connection) => {
        if(err) throw err; // not connected!
        console.log('Connected as ID ' + connection.threadId);

        //user the connection
        connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
            // When done with the connection, release it 
            connection.release();
            
            if(!err) {
                res.render('view-user', { rows });
            } else {
                console.log(err)
            }

            console.log('The data from user table: \n', rows);

        });
    });
}