const { todosTable } = require('./tables/todosTable');

const getAll = () => [...todosTable];

/**
 * @param {number} id
 */
const findById = id => todosTable.find(v => v.id === id);

/**
 * @param {number} userId
 */
const getByUserId = userId => todosTable.filter(v => v.userId === userId);

module.exports = {
  getAll,
  findById,
  getByUserId,
};
