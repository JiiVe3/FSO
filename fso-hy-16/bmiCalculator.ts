export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / ((height / 100) ** 2);
  if (bmi < 18.5) return `${bmi.toFixed(2)} - Underweight`;
  else if (bmi <= 25) return `${bmi.toFixed(2)} - Normal`;
  else if (bmi > 25) return `${bmi.toFixed(2)} - Overweight`;
  else throw new Error(`${bmi.toFixed(2)} - Something went wrong.`);
};

export const parseBmi = (heightQuery: any, weightQuery: any): Array<number> => {
  const height = Number(heightQuery);
  const weight = Number(weightQuery);
  if (isNaN(height) || isNaN(weight)) throw new Error('Given height or weight were not numbers.');
  return [height, weight];
}

const parseBmiArgv = (argv: Array<string>): Array<number> => {
  const height = Number(argv[2]);
  const weight = Number(argv[3]);
  if (isNaN(height) || isNaN(weight)) throw new Error('Given height or weight were not numbers.');
  return [height, weight];
}

try {
  const [height, weight] = parseBmiArgv(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error) {
  console.log(error);
}