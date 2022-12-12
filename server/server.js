const fs = require('fs');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');

const server = jsonServer.create();
let userdb = JSON.parse(fs.readFileSync('./server/users.json', 'utf-8'));
// let contactsdb = JSON.parse(fs.readFileSync('./server/contacts.json', 'utf-8'));

server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

const SECRET_KEY = '895521';
const expiresIn = '1h';

function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, {expiresIn});
}

function isAuthenticated({email, password}) {
  return (
    userdb.users.findIndex(user => user.email === email && user.password === password) !== -1
  )
}

server.post('/api/auth/register', (req, res) => {
  const {email, password} = req.body;
  if (isAuthenticated({email, password})) {
    const status = 401;
    const message = 'Email & Password already exist';
    res.status(status).json({status, message})
    return;
  }

  fs.readFile('./server/users.json', (err, data) => {
    if (err) {
      const status = 401;
      const message = err;
      res.status(status).json({status,message});
      return;
    }
    data = JSON.parse(data.toString());
    let last_item_id = data.users[data.users.length - 1].id;
    data.users.push({id: last_item_id + 1, email: email, password: password});
    let writeData = fs.writeFile(
      "./server/users.json",
      JSON.stringify(data),
      (err, result) => {
        if (err) {
          const status = 401;
          const message = err;
          res.status(status).json({status,message});
          return;
        }
        userdb = JSON.parse(fs.readFileSync('./server/users.json', 'utf-8'));
      }
    )
  });

  const access_token = createToken({email, password});
  res.status(200).json({access_token, email});
});

server.post("/api/auth/login", (req, res) => {
  const {email, password} = req.body;
  if (!isAuthenticated({email, password})) {
    const status = 401;
    const message = 'Incorrect Email or Password';
    res.status(status).json({status, message})
    return;
  }
  const access_token = createToken({email, password});

  res.status(200).json({access_token, email});
});

server.post("/api/contacts/get", (req, res) => {
  const {email} = req.body;
  if (!email) {
    const status = 401;
    const message = 'Email is Empty';
    res.status(status).json({status, message})
    return;
  }

  let contacts = JSON.parse(fs.readFileSync('./server/contacts.json', 'utf-8'))[email];
  res.status(200).json(contacts === undefined ? {contacts: []} : {contacts});
});

server.post("/api/contacts/edit", (req, res) => {
  const {email, id, name, surname, phone} = req.body;
  if (!email) {
    const status = 401;
    const message = 'Email is Empty';
    res.status(status).json({status, message})
    return;
  }

  let contacts = JSON.parse(fs.readFileSync('./server/contacts.json', 'utf-8'));
  for (let i = 0; i < contacts[email].length; ++i) {
    if (id === contacts[email][i].id) {
      contacts[email][i].name = name;
      contacts[email][i].surname = surname;
      contacts[email][i].phone = phone;
      break;
    }
  }

  fs.writeFile(
    "./server/contacts.json",
    JSON.stringify(contacts),
    (err, result) => {
      if (err) {
        const status = 401;
        const message = err;
        res.status(status).json({status,message});
        return;
      }
    }
  )

  contacts = JSON.parse(fs.readFileSync('./server/contacts.json', 'utf-8'))[email];
  res.status(200).json({contacts});
});

server.post("/api/contacts/delete", (req, res) => {
  const {email, id} = req.body;
  if (!email) {
    const status = 401;
    const message = 'Email is Empty';
    res.status(status).json({status, message})
    return;
  }

  let contacts = JSON.parse(fs.readFileSync('./server/contacts.json', 'utf-8'));
  let user =  contacts[email].filter(item => item.id !== id);
  for (let i = 0; i < user.length; ++i) {
    user[i].id = i + 1;
  }

  contacts[email] = user;

  fs.writeFile(
    "./server/contacts.json",
    JSON.stringify(contacts),
    (err, result) => {
      if (err) {
        const status = 401;
        const message = err;
        res.status(status).json({status,message});
        return;
      }
    }
  )

  res.status(200).json({contacts: contacts[email]});
});

server.post("/api/contacts/add", (req, res) => {
  const {email, name, surname, phone} = req.body;
  if (!email) {
    const status = 401;
    const message = 'Email is Empty';
    res.status(status).json({status, message})
    return;
  }

  let contacts = JSON.parse(fs.readFileSync('./server/contacts.json', 'utf-8'));
  let user =  contacts[email] === undefined ? [] : contacts[email]

  const nextId = user.length + 1;
  user.push({id: nextId, name: name, surname:surname, phone:phone});

  for (let i = 0; i < user.length; ++i) {
    user[i].id = i + 1;
  }

  contacts[email] = user;

  fs.writeFile(
    "./server/contacts.json",
    JSON.stringify(contacts),
    (err, result) => {
      if (err) {
        const status = 401;
        const message = err;
        res.status(status).json({status,message});
        return;
      }
    }
  )

  res.status(200).json({contacts: contacts[email]});
});

server.listen(5000, () => {
  console.log('Running fake api json server');
})
