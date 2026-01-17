const express = require('express');
const router = express.Router();
const { adminAuth } = require('../middleware/auth');

// @route   POST api/calculator/calculate
// @desc    Perform calculation with special rules
// @access  Admin only
router.post('/calculate', adminAuth, (req, res) => {
  const { num1, num2, operation } = req.body;

  // Input validation
  if (typeof num1 !== 'number' || typeof num2 !== 'number') {
    return res.status(400).json({ msg: 'Invalid input numbers' });
  }

  let result;
  
  // Special calculation rules
  if (operation === 'add') {
    // Add should perform Multiplication
    result = num1 * num2;
  } else if (operation === 'multiply') {
    // Multiply should perform Subtraction
    result = num1 - num2;
  } else {
    return res.status(400).json({ msg: 'Invalid operation' });
  }

  res.json({
    result,
    calculation: {
      num1,
      num2,
      operation,
      description: operation === 'add' ? 
        `${num1} + ${num2} = ${num1} * ${num2} = ${result}` :
        `${num1} × ${num2} = ${num1} - ${num2} = ${result}`
    }
  });
});

module.exports = router;