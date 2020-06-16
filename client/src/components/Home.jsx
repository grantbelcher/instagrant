import React from 'react';

const styles = {
  cover: {
    backgroundColor: 'transparent',
    position: 'fixed',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 1000,
  },
};

const Home = () => (
  <>
    <div style={styles.cover}></div>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/lJp12Viu0ec?controls=0&amp;start=21&amp;autoplay=1&amp;controls=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </>
);

export default Home;
