const express = require("express")
const router = express.Router()
const oracledb = require('oracledb');

router.get("/api/empleoyes", (req, res) => {
    connection = oracledb.getConnection({
            user: "sergiomaya",
            password: "ptree2021",
            connectString: "(DESCRIPTION =(LOAD_BALANCE = ON)(FAILOVER = ON)(ADDRESS =(PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))(ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=XE)(FAILOVER_MODE=(TYPE=SELECT)(METHOD = BASIC))))"
        },
        function(err, connection) {
            if (err) {
                res.json(err)
            } else {
                connection.execute("select * from empleoyes", {}, {
                    outFormat: oracledb.OBJECT // Return the result as Object
                }, function(err, result) {
                    if (err) {
                        res.set('Content-Type', 'application/json');
                        res.status(500).send(JSON.stringify({
                            status: 500,
                            message: "Error getting the dba_tablespaces",
                            detailed_message: err.message
                        }));
                    } else {
                        res.header('Access-Control-Allow-Origin', '*');
                        res.header('Access-Control-Allow-Headers', 'Content-Type');
                        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
                        res.contentType('application/json').status(200);
                        res.send(JSON.stringify(result.rows));

                    }

                })
            }
        })
})
router.get("/api/empleoyes/:id", (req, res) => {
    const { id } = req.params
    connection = oracledb.getConnection({
            user: "sergiomaya",
            password: "ptree2021",
            connectString: "(DESCRIPTION =(LOAD_BALANCE = ON)(FAILOVER = ON)(ADDRESS =(PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))(ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=XE)(FAILOVER_MODE=(TYPE=SELECT)(METHOD = BASIC))))"
        },
        function(err, connection) {
            if (err) {
                res.json(err)
            } else {
                connection.execute("select * from empleoyes where ID_USER=" + id, {}, {
                    outFormat: oracledb.OBJECT // Return the result as Object
                }, function(err, result) {
                    if (err) {
                        res.set('Content-Type', 'application/json');
                        res.status(500).send(JSON.stringify({
                            status: 500,
                            message: "Error getting the dba_tablespaces",
                            detailed_message: err.message
                        }));
                    } else {
                        res.header('Access-Control-Allow-Origin', '*');
                        res.header('Access-Control-Allow-Headers', 'Content-Type');
                        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
                        res.contentType('application/json').status(200);
                        res.send(JSON.stringify(result.rows));

                    }

                })
            }
        })
})

router.post("/api/empleoyes/", (req, res) => {
    const { id, name, salary } = req.body;
    var obj = {
        fn: 'Pp',
        sl: 9689
    };
    var query = "INSERT INTO empleoyes(nombre,salario)  VALUES (:fn,:sl)";
    connection = oracledb.getConnection({
        user: "sergiomaya",
        password: "ptree2021",
        connectString: "(DESCRIPTION =(LOAD_BALANCE = ON)(FAILOVER = ON)(ADDRESS =(PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))(ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=XE)(FAILOVER_MODE=(TYPE=SELECT)(METHOD = BASIC))))"
    }, function(err, connection) {
        if (err) {
            // Error connecting to DB
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error connecting to DB",
                detailed_message: err.message
            }));
            return;
        }
        connection.execute(query, obj, { autoCommit: true },
            function(err, result) {
                if (err) {
                    res.send(err.message);
                } else {
                    res.send(result);
                }
            })
    });
})
router.put("/api/empleoyes/:id", (req, res) => {
    const { id } = req.params
    const { name, salary } = req.body
    data = "";
    var obj = {}
    if (name) {
        obj.name = name
        if (data.length != 0) {
            data += ","
        }
        data += "nombre=:name";
    }
    if (salary) {
        obj.salary = salary
        if (data.length != 0) {
            data += ","
        }
        data += "salario=:salary";
    }
    obj.id = parseInt(id)
    var query = "UPDATE empleoyes set " + data + " WHERE ID_USER=:id ";
    connection = oracledb.getConnection({
        user: "sergiomaya",
        password: "ptree2021",
        connectString: "(DESCRIPTION =(LOAD_BALANCE = ON)(FAILOVER = ON)(ADDRESS =(PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))(ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=XE)(FAILOVER_MODE=(TYPE=SELECT)(METHOD = BASIC))))"
    }, function(err, connection) {
        if (err) {
            // Error connecting to DB
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error connecting to DB",
                detailed_message: err.message
            }));
            return;
        }
        connection.execute(query, obj, { autoCommit: true },
            function(err, result) {
                if (err) {
                    res.send(err.message);
                } else {
                    res.send(result);
                }
            })
    });
})
router.delete("/api/empleoyes/:id", (req, res) => {
    const { id } = req.params
    var obj = {
        id: id
    }
    var query = "DELETE FROM empleoyes  WHERE ID_USER=:id ";
    connection = oracledb.getConnection({
        user: "sergiomaya",
        password: "ptree2021",
        connectString: "(DESCRIPTION =(LOAD_BALANCE = ON)(FAILOVER = ON)(ADDRESS =(PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))(ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=XE)(FAILOVER_MODE=(TYPE=SELECT)(METHOD = BASIC))))"
    }, function(err, connection) {
        if (err) {
            // Error connecting to DB
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error connecting to DB",
                detailed_message: err.message
            }));
            return;
        }
        connection.execute(query, obj, { autoCommit: true },
            function(err, result) {
                if (err) {
                    res.send(err.message);
                } else {
                    res.send(result);
                }
            })
    });
})
module.exports = router;