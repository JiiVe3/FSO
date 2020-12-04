import express from 'express';
import { calculateBmi, parseBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const [height, weight] = parseBmi(req.query.height, req.query.weight);
    const bmi = calculateBmi(height, weight);
    res.json({weight, height, bmi});
  } catch (error) {
    res.json({error})
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});