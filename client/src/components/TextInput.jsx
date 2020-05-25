import React from 'react';

const styles = {
  container: {
    border: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    // alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    position: 'fixed',
    height: '5vh',
    // top: '95vh',
    width: '100vw',
    bottom: '0vh',
    backgroundColor: 'black',
    paddingBottom: '3vh',
  },
  input: {
    width: '70vw',
  },
};

const TextInput = () => {
  console.log('jjj');
  return (
    <div style={styles.container}>
      <input
        placeholder="fuck"
        style={styles.input}
      />
    </div>
  );
};

export default TextInput;
