const userData = require('./users-data');

const getSummery = () => userData.map(v => ({
  id: v.id,
  name: v.name,
}));

/**
 * @param {number} id
 */
const findById = id => userData.find(v => v.id === id);

module.exports = {
  getSummery,
  findById,
};
