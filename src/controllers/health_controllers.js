const wrapper = require('../helpers/wrapper');
const {SUCCESS: http} = require('../helpers/wrapper-status-code');

const helloHealth = async (req, res) => {
  let result = ({data:'Hello Health'});
  return wrapper.response(res, 'success', result, 'Success Get Health', http.OK);
};

module.exports = {
  helloHealth
};
