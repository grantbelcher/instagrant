import React from 'react';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';


const Recipients = ({ recipients, setRecipients }) => {

  const deleteRecipient = (recipient) => {
    const recipientCopy = recipients.filter(user => user._id !== recipient._id);
    setRecipients(recipientCopy);
  };

  const chips = recipients.map((user) => (
    <Chip
      style={{ padding: 3 }}
      key={user._id}
      label={user.name}
      onDelete={() => deleteRecipient(user)}
    />
  ));
  return (
    <Paper>
      {chips}
    </Paper>
  );
};

export default Recipients;
