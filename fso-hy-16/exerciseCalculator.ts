interface ParsedExerciseArgv {
  days: Array<number>,
  target: number
}

const calculateExercises = (days: Array<number>, target: number): object => {
  const result = {
    periodLength: days.length,
    trainingDays: days.filter(day => day != 0).length,
    success: false,
    rating: 0,
    ratingDescription: '',
    target,
    average: days.reduce((a, b) => a + b, 0) / days.length
  };

  result.success = result.average >= result.target;

  result.rating =
    result.average >= target ? 3
    : result.average > target * 0.85 ? 2
    : 1;

  switch (result.rating) {
    case 3:
      result.ratingDescription = 'Well done! You have met your target.';
      break;
    case 2:
      result.ratingDescription = 'Close, but you are missing some hours.';
      break;
    case 1:
      result.ratingDescription = 'You have missed a lot of hours.';
      break;
    default:
      result.ratingDescription = '';
      break;
  };

  return result;
};

const parseExerciseArgv = (argv: Array<string>): ParsedExerciseArgv => {
  let days: Array<number> = [];
  if (isNaN(Number(argv[3]))) throw new Error('Provided target hours were not a number.');
  argv[2].split(', ').forEach(day => {
    if (!isNaN(Number(day))) days.push(Number(day));
    else throw new Error('Provided daily hours contain not a number.');
  });
  return {days, target: Number(argv[3])};
};

try {
  const {days, target} = parseExerciseArgv(process.argv);
  console.log(calculateExercises(days, target));
} catch (error) {
  console.log(error);
}