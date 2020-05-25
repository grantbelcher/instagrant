import React, { useState, useEffect } from 'react';

const App = () => {
  const [state, setState] = useState(null);
  useEffect(() => {
    setState(100);
  }, []);
  return (
    <div>
      <h1>{state}</h1>
    </div>
  );
};

export default App;
