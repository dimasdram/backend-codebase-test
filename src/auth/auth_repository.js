const config = require('../global-config/config');
class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  isValidPassword(password) {
    return this.password === password;
  }
}

module.exports.findByUsername = (username, data) => {
  const userDatas = config.get('/basicAuthApi');
  let userData;
  userData = userDatas.map((value) => {
    if (value.username === username) {
      return value;
    }
    return '';
  });
  const user = new User(userData[0].username, userData[0].password);
  data(user);
};
