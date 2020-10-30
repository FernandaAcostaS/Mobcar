// Create express app
var express = require("express")
var app = express()
var db = require("./database.js")
var cors = require("cors")
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
// Server port
var HTTP_PORT = 8000
// Start server
app.listen(HTTP_PORT, () => {
    console.log(`Servidor rodando na porta ${HTTP_PORT}`)
});
// Root endpoint
app.get("/", (req, res, next) => {
    res.json({ "message": "Online" })
});


//Lista todos os carros
app.get("/api/carros", (req, res, next) => {

    var sql = "select * from carros"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
    });
});
//Lista ano
app.get("/api/carros/ano", (req, res, next) => {
    
    var sql = "select * from carros"
    var params = []
    db.all(sql, params, (err, rows) => {
        var resp = rows.map((carros) => {

        return {
           ano: carros.ano,
           id:carros.id
            }
        }
    );
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": resp
        })
    });
});
//Lista nomes
app.get("/api/carros/nome", (req, res, next) => {
    var sql = "select * from carros"
    var params = []
    db.all(sql, params, (err, rows) => {
        var resp = rows.map((carros) => {

            return {
               nome: carros.nome,
               id:carros.id
                }
            }
        );
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": resp
        })
    });
});

//Retorna o carro específico para aquele id, caso contrário, retorna uma mensagem de erro
app.get("/api/carros/:id", (req, res, next) => {
    var sql = "select * from carros where id = ?";
    var params = [req.params.id];
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        if (row != null) {
            res.json({
                "message": "success",
                "data": row
            })
        } else {
            res.json({
                "message": "Não existem carros para esse id"
            })
        }
    });
});

//Cria um carro
app.post("/api/carros", (req, res, next) => {
    var errors = []
    if (!req.body.preco) {
        errors.push("preço não especificado");
    }
    if (!req.body.ano) {
        errors.push("ano não especificado");
    }
    if (errors.length) {
        res.status(400).json({ "error": errors.join(",") });
        return;
    }
    var data = {
        nome: req.body.nome,
        ano: req.body.ano,
        preco: req.body.preco
    }
    var sql = 'INSERT INTO carros (nome, ano, preco) VALUES (?,?,?)'
    var params = [data.nome, data.ano, data.preco]
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        data.id = this.lastID;
        res.json({
            "message": "success",
            "data": data,
        })
    });
})

//Atualiza um carro
app.patch("/api/carros/:id", (req, res, next) => {
    var data = {
        name: req.body.nome,
        email: req.body.ano,
        password: req.body.preco
    }

    db.run(
        `UPDATE carros set 
           nome = COALESCE(?,nome), 
           ano = COALESCE(?,ano), 
           preco = COALESCE(?,preco) 
           WHERE id = ?`,
        [data.nome, data.ano, data.preco, req.params.id],
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.json({
                message: "success",
                data: data
            })
        });
})

//Remove um carro
app.delete("/api/carros/:id", (req, res, next) => {
    db.run(
        'DELETE FROM carros WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.json({ "message": "deleted", changes: this.changes })
        });
})




app.use(function (req, res) {
    res.status(404).json({"message": "url não encontrada"});
});


//Cria um usuario
app.post("/api/login", (req, res, next) => {
    var errors = []
    if (!req.body.nome) {
        errors.push("preço não especificado");
    }
    if (!req.body.senha) {
        errors.push("ano não especificado");
    }
    if (errors.length) {
        res.status(400).json({ "error": errors.join(",") });
        return;
    }
    var data = {
        nome: req.body.nome,
        senha: req.body.senha
    }
    var sql = 'INSERT INTO carros (nome, ano, preco) VALUES (?,?,?)'
    var params = [data.nome, data.senha]
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        data.id = this.lastID;
        res.json({
            "message": "success",
            "data": data,
        })
    });
})

