import React, { useState } from 'react';
import { Equal, Delete, Plus, Minus, X, Divide, History } from 'lucide-react';

function App() {
  const [display, setDisplay] = useState('0');
  const [history, setHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleNumber = (num: string) => {
    setDisplay(prev => prev === '0' ? num : prev + num);
  };

  const handleOperator = (op: string) => {
    setDisplay(prev => prev + op);
  };

  const calculate = () => {
    try {
      // Replace × with * and ÷ with / for evaluation
      const expression = display.replace(/×/g, '*').replace(/÷/g, '/');
      const result = eval(expression).toString();
      setHistory(prev => [...prev, `${display} = ${result}`]);
      setDisplay(result);
    } catch (error) {
      setDisplay('Error');
    }
  };

  const clear = () => {
    setDisplay('0');
  };

  const deleteLastChar = () => {
    setDisplay(prev => prev.length === 1 ? '0' : prev.slice(0, -1));
  };

  const Button = ({ children, onClick, className = '' }: { children: React.ReactNode, onClick: () => void, className?: string }) => (
    <button
      onClick={onClick}
      className={`p-4 text-lg font-medium rounded-xl transition-all hover:bg-opacity-90 active:scale-95 ${className}`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white flex justify-between items-center">
            <h1 className="text-2xl font-bold">Calculator</h1>
            <button 
              onClick={() => setShowHistory(!showHistory)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <History size={24} />
            </button>
          </div>

          {/* Display */}
          <div className="p-6 bg-gray-50">
            <div className="bg-white h-20 rounded-xl flex items-center justify-end px-6 text-3xl font-semibold shadow-inner">
              {display}
            </div>
          </div>

          {/* History Panel */}
          {showHistory && (
            <div className="bg-gray-50 border-t border-gray-100 p-4 max-h-40 overflow-y-auto">
              {history.map((item, index) => (
                <div key={index} className="text-sm text-gray-600 py-1">{item}</div>
              ))}
              {history.length === 0 && (
                <div className="text-sm text-gray-400 text-center">No history yet</div>
              )}
            </div>
          )}

          {/* Keypad */}
          <div className="grid grid-cols-4 gap-2 p-4 bg-white">
            <Button onClick={clear} className="bg-red-100 text-red-600">C</Button>
            <Button onClick={deleteLastChar} className="bg-gray-100">
              <Delete size={20} className="mx-auto" />
            </Button>
            <Button onClick={() => handleOperator('÷')} className="bg-gray-100">
              <Divide size={20} className="mx-auto" />
            </Button>
            <Button onClick={() => handleOperator('×')} className="bg-gray-100">
              <X size={20} className="mx-auto" />
            </Button>

            {[7, 8, 9].map(num => (
              <Button key={num} onClick={() => handleNumber(num.toString())} className="bg-white hover:bg-gray-50">
                {num}
              </Button>
            ))}
            <Button onClick={() => handleOperator('-')} className="bg-gray-100">
              <Minus size={20} className="mx-auto" />
            </Button>

            {[4, 5, 6].map(num => (
              <Button key={num} onClick={() => handleNumber(num.toString())} className="bg-white hover:bg-gray-50">
                {num}
              </Button>
            ))}
            <Button onClick={() => handleOperator('+')} className="bg-gray-100">
              <Plus size={20} className="mx-auto" />
            </Button>

            {[1, 2, 3].map(num => (
              <Button key={num} onClick={() => handleNumber(num.toString())} className="bg-white hover:bg-gray-50">
                {num}
              </Button>
            ))}
            <Button onClick={calculate} className="bg-blue-600 text-white row-span-2">
              <Equal size={20} className="mx-auto" />
            </Button>

            <Button onClick={() => handleNumber('0')} className="bg-white hover:bg-gray-50 col-span-2">
              0
            </Button>
            <Button onClick={() => handleNumber('.')} className="bg-white hover:bg-gray-50">
              .
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;