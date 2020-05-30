import React, { useState } from 'react';

const styles = {
  container: {
    position: 'absolute',
    width: '69%',
    bottom: '0%',
    backgroundColor: 'rgba(355, 355, 355, 0.8)',
  },
  g: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    // width: '85%',
    borderRadius: 5,
    alignSelf: 'flex-start',
    resize: 'none',
    flex: 49,
  },
  iconBorder: {
    position: 'relative',
    borderRadius: '20%',
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'flex-end',
    flex: 1,
    padding: '2.3%',
    marginLeft: 5,
  },
};

const TextInput = () => {
  const [text, setText] = useState('');
  console.log('yppppp');
  return (
    <div style={styles.container}>
      <div style={styles.g}>
        <textarea
          rows="2"
          placeholder="fucdddk"
          value={text}
          style={styles.input}
          onChange={(e) => setText(e.target.value)}
        />
        <i className="fas fa-paper-plane fa-sm" style={styles.iconBorder} />
      </div>
    </div>
  );
};

export default TextInput;
