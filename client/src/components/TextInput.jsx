import React, { useState } from 'react';

const styles = {
  container: {
    // border: 'solid',
    // borderWidth: 1,
    // borderColor: 'black',
    // float: 'right',
    // display: 'flex',

    // flexDirection: 'row',
    position: 'fixed',
    height: '4vh',
    // top: '95vh',
    width: '100vw',
    bottom: '3vh',
    backgroundColor: 'rgba(355, 355, 355, 0.8)',
    paddingBottom: '2vh',
  },
  g: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'flex-end',
  },
  input: {
    width: '90vw',
    borderRadius: 5,
    alignSelf: 'flex-start',
    resize: 'none',
  },
  iconBorder: {
    borderRadius: '20%',
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'flex-end',
    padding: '3vw',
  },
};

const TextInput = () => {
  const [text, setText] = useState('');
  return (
    <div style={styles.container}>
      <div style={styles.g}>
        <textarea
          rows="2"
          placeholder="fuck"
          value={text}
          style={styles.input}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
    </div>
  );
};

export default TextInput;
