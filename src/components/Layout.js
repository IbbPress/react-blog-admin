import React from 'react';
function Home (props) {
  return (
    <div className="layout">
      {props.children}
    </div>
  )
}

export default Home;