const express = require('express');
var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'db',
  user     : 'root',
  password : 'root',
  database : 'nodedb'
});
 
connection.connect();

const app = express();

async function createPeople(name) {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO people(name) VALUES ('${name}')`, function (error, _, _) {
      if (error) return reject(error);
      resolve()
    });
  })
}

async function listPeople() {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT name FROM people`, function (error, results, fields) {
      if (error) return reject(error);
      resolve(results.map(({ name }) => name))
    });
  })
}

app.get('/', async (req, res) => {
    const { name } = req.query

    if (!name) {
      return res.send('please provide a name query parameter')
    }

    await createPeople(name)
    const people = await listPeople()

    let response = '<h1>Full Cycle Rocks!</h1>'
    response += '<ul>'
    response += people.map(name => `<li>${name}</li>`).join('')
    response += '</ul>'

    return res.send(response);
})

app.get('/health', (req, res) => {
  return res.send('ok');
})

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
})