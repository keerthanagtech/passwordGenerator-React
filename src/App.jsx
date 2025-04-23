import { useCallback, useRef, useState } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [numAllow, setNumAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState('');

  const passwordRef = useRef(null); // ref for input element

  // Password generator function
  const PassWordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'; // str+num+sym

    if (numAllow) str += '0123456789';
    if (charAllow) str += '!@#$%^&*()_+{}[]~';

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);//change pass
  }, [length, numAllow, charAllow]);

  // Copy password to clipboard with selection
  const handleCopy = () => {
    if (passwordRef.current) {
      passwordRef.current.select();
      passwordRef.current.setSelectionRange(0, 999); // For mobile
      navigator.clipboard.writeText(password);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-800 px-4 sm:px-6 md:px-8">
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-6 py-6 text-orange-500 bg-gray-500">
        <h1 className="text-white text-xl font-bold text-center mb-4">Password Generator</h1>

        {/* Input + Copy Button */}
        <div className="flex items-center shadow rounded-lg overflow-hidden mb-4 bg-white">
          <input
            type="text"
            value={password}
            ref={passwordRef} // Attach ref here
            readOnly //imp
            className="outline-none w-full py-2 px-3 text-black sm:w-3/4"
            placeholder="password"
          />
          <button
            onClick={handleCopy}
            className="bg-blue-500 text-white px-4 py-2 ml-2 sm:ml-4 sm:w-1/4 hover:bg-orange-600 transition duration-200"
          >
            Copy
          </button>
        </div>

        {/* Range + Checkboxes */}
        <div className="flex flex-col space-y-2 text-white mb-4">
          <div className="flex items-center justify-between">
            <input
              type="range"
              min={4}
              max={50}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="cursor-pointer w-full mr-2"
            />
            <span>Length: {length}</span>
          </div>

          <label>
            <input
              type="checkbox"
              checked={numAllow}
              onChange={() => setNumAllow(!numAllow)}
              className="mr-2"
            />
            Include Numbers
          </label>
          <label>
            <input
              type="checkbox"
              checked={charAllow}
              onChange={() => setCharAllow(!charAllow)}
              className="mr-2"
            />
            Include Symbols
          </label>
        </div>

        {/* Generate Button */}
        <button
          onClick={PassWordGenerator}
          className="w-full bg-orange-500 text-white font-bold py-2 rounded hover:bg-orange-600"
        >
          Generate Password
        </button>
      </div>
    </div>
  );
}

export default App;
