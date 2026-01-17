import React, { useState } from 'react';
import axiosInstance from '../../utils/axiosConfig';
import { toast } from 'react-hot-toast';

const Calculator = () => {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const handleCalculate = async () => {
    if (num1 === '' || num2 === '') {
      toast.error('Please enter both numbers');
      return;
    }

    const num1Val = parseFloat(num1);
    const num2Val = parseFloat(num2);

    if (isNaN(num1Val) || isNaN(num2Val)) {
      toast.error('Please enter valid numbers');
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.post('/calculator/calculate', {
        num1: num1Val,
        num2: num2Val,
        operation
      });

      setResult(response.data.result);
      
      // Add to history
      const newHistory = [
        {
          num1: num1Val,
          num2: num2Val,
          operation,
          result: response.data.result,
          description: response.data.calculation.description,
          timestamp: new Date().toLocaleTimeString()
        },
        ...history.slice(0, 4) 
      ];
      setHistory(newHistory);

      toast.success('Calculation completed!');
    } catch (err) {
      const errorMsg = err.response?.data?.msg || 'Calculation failed';
      toast.error(errorMsg);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setNum1('');
    setNum2('');
    setResult(null);
  };

  const getOperationSymbol = (op) => {
    return op === 'add' ? '+' : '×';
  };

  const getActualOperation = (op) => {
    return op === 'add' ? 'Multiplication' : 'Subtraction';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-carbonx-primary to-carbonx-secondary p-6 text-white">
          <h2 className="text-2xl font-bold">Special Calculator</h2>
          <p className="opacity-90 mt-2">
            This calculator has special rules: 
            <span className="font-semibold"> Add performs Multiplication, Multiply performs Subtraction</span>
          </p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <div>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Number
                  </label>
                  <input
                    type="number"
                    value={num1}
                    onChange={(e) => setNum1(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-carbonx-primary focus:border-transparent outline-none transition"
                    placeholder="Enter first number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Second Number
                  </label>
                  <input
                    type="number"
                    value={num2}
                    onChange={(e) => setNum2(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-carbonx-primary focus:border-transparent outline-none transition"
                    placeholder="Enter second number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Operation
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setOperation('add')}
                      className={`p-4 border rounded-lg transition ${
                        operation === 'add'
                          ? 'border-carbonx-primary bg-carbonx-primary/10 text-carbonx-primary'
                          : 'border-gray-300 hover:border-carbonx-primary'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-lg font-bold">Add (+)</div>
                        {/* <div className="text-sm mt-1">(Performs Multiplication)</div> */}
                      </div>
                    </button>
                    <button
                      onClick={() => setOperation('multiply')}
                      className={`p-4 border rounded-lg transition ${
                        operation === 'multiply'
                          ? 'border-carbonx-primary bg-carbonx-primary/10 text-carbonx-primary'
                          : 'border-gray-300 hover:border-carbonx-primary'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-lg font-bold">Multiply (×)</div>
                        {/* <div className="text-sm mt-1">(Performs Subtraction)</div> */}
                      </div>
                    </button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={handleCalculate}
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-carbonx-primary to-carbonx-secondary text-white py-3 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50"
                  >
                    {loading ? 'Calculating...' : 'Calculate'}
                  </button>
                  <button
                    onClick={handleClear}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                  >
                    Clear
                  </button>
                </div>
              </div>

              {/* Result Display */}
              {result !== null && (
                <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl border border-green-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Result</h3>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-carbonx-primary mb-2">
                      {result}
                    </div>
                    <p className="text-gray-600">
                      {num1} {getOperationSymbol(operation)} {num2} = {result}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Note: {getOperationSymbol(operation)} actually performed {getActualOperation(operation)}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* History and Examples */}
            <div>
              {/* Examples */}
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Examples</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-white rounded-lg border border-gray-200">
                    <div className="font-medium text-gray-800">Add (5, 3)</div>
                    <div className="text-sm text-gray-600">
                      5 + 3 → Actually performs: 5 × 3 = <span className="font-bold text-carbonx-primary">15</span>
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-gray-200">
                    <div className="font-medium text-gray-800">Multiply (5, 3)</div>
                    <div className="text-sm text-gray-600">
                      5 × 3 → Actually performs: 5 - 3 = <span className="font-bold text-carbonx-primary">2</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* History */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Calculations</h3>
                {history.length > 0 ? (
                  <div className="space-y-3">
                    {history.map((item, index) => (
                      <div
                        key={index}
                        className="p-3 border border-gray-200 rounded-lg hover:border-carbonx-primary transition"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium text-gray-800">
                              {item.num1} {getOperationSymbol(item.operation)} {item.num2}
                            </div>
                            <div className="text-sm text-gray-600">{item.description}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-carbonx-primary">
                              {item.result}
                            </div>
                            <div className="text-xs text-gray-500">{item.timestamp}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No calculations yet. Perform a calculation to see history.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;