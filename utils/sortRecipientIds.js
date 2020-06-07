const sortIds = (userIds) => {
  const sortedIds = userIds.sort((a, b) => a.localeCompare(b));
  return sortedIds.join('');
};

module.exports = sortIds;
