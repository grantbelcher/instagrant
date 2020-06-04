import React from 'react';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';


const Recipients = ({ recipients, setRecipients, user: currentUser }) => {
  const deleteRecipient = (recipient) => {
    const recipientCopy = recipients.filter((user) => user._id !== recipient._id);
    setRecipients(recipientCopy);
  };
  console.log(recipients, 'quuiiii');
  const chips = recipients.map((user) => {
    if (!user._id || user._id === currentUser._id) return null;
    return (
      <Chip
        style={{ padding: 3 }}
        key={user._id}
        label={user.name}
        onDelete={() => deleteRecipient(user)}
      />
    );
  });
  return (
    <Paper>
      {chips}
    </Paper>
  );
};

export default Recipients;
