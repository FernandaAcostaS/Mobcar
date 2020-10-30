var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE carros (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome text UNIQUE, 
            ano INTERGER, 
            preco INTERGER, 
            CONSTRAINT nome_unique UNIQUE (nome)
            )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO carros (nome, ano, preco) VALUES (?,?,?)'
                db.run(insert, ["Clio","2016", 24000])
                db.run(insert, ["Onix","2019",32000])
                db.run(insert, ["Hilux","2017",150000])
                db.run(insert, ["Duster","2020",120000])
            }
        });  
    }
});


module.exports = db