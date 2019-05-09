const { usersTable } = require('./tables/usersTable');

const getSummery = () => usersTable.map(v => ({
  id: v.id,
  name: v.name,
}));

/**
 * @param {number} id
 */
const findById = id => usersTable.find(v => v.id === id);

module.exports = {
  getSummery,
  findById,
};
