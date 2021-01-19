module.exports = () => {
    const controller = {};
    const sql = require('mssql');
    const request = new sql.Request();
    request.multiple = true;
    const uuidv4 = require('uuid');

    controller.listCities = async (req, res) => {
        await request.query('SELECT * from Cidade').then(result => {
            res.json(result.recordset)
        }).catch(err => {
            res.json(err)
        })
    }

    controller.addCity = async (req, res) => {
        const id = uuidv4();
        const cidade = req.body.data.cidade;
        const pais = req.body.data.pais;
        await request.query(`INSERT INTO Cidade(id, cidade, pais) VALUES('${id}','${cidade}','${pais}')`).then(
            res.status(200),  
            res.json((await request.query(`SELECT * from Cidade`)).recordset)
        ).catch(err => {
            res.status(400).json(err);
        })
    }

    controller.detailsCity = async (req, res) => {
        console.log("details")
        await request.query(`SELECT * FROM Cidade where id = '${req.params.id}'`).then( result => {
            res.json(result.recordset)
            res.status(204)
        }).catch(err => {
            res.status(400).json(err);
        })
    }

    controller.editCity = async (req, res) => {
        const cidade = req.body.cidade;
        const pais = req.body.pais;
        await request.query(`UPDATE Cidade SET cidade = '${cidade}', pais = '${pais}' where id = '${req.params.id}'`).then( result => 
            res.status(200),
            res.json((await request.query(`SELECT * from Cidade WHERE id ='${req.params.id}'`)).recordset)
        ).catch(err => {
            res.status(400).json(err);
        })
    }

    controller.deleteCity = async (req, res) => {
        await request.query(`DELETE FROM Cidade where id = '${req.params.id}'`).then(  
            res.status(204),
            res.json((await request.query(`SELECT * from Cidade`)).recordset)
        ).catch(err => {
            res.status(404).json(err);
        })  
    } 

    return controller;
}