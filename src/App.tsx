import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <p>hello from react</p>
      <button onClick={() => setCount((count) => count + 1)}>
        Counter is {count}
      </button>
    </>
  );
}

export default App;
