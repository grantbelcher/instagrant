/* eslint-disable import/prefer-default-export */
const createUserQuery = ({
  username, fullName, password,
}) => {
  if (username && fullName && password) {
    const values = `"${username}", "${fullName}", "${password}"`;
    return `INSERT INTO users (username, fullname, password) VALUES (${values});`;
  }
};

module.exports.createUserQuery = createUserQuery;
