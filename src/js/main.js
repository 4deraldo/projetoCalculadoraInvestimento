import '../style/style.css';
import { generateReturnArray } from './investimentGoals.js';

const calculateButton = document.getElementById('calculateResoults');

function renderProgression(event) {
  event.preventDefault();
  const startingAmount = Number(
    document.getElementById('initialInvestment').value,
  );

  const additionalContributions = Number(
    document.getElementById('additionalContributions').value,
  );

  const investmentTime = Number(
    document.getElementById('investmentTime').value,
  );

  const investmentTimePeriod = document.getElementById(
    'investmentTimePeriod',
  ).value;

  const returnRate = Number(document.getElementById('returnRate').value);

  const evaluationPeriod = document.getElementById('evaluationPeriod').value;

  const returnArray = generateReturnArray(
    startingAmount,
    investmentTime,
    investmentTimePeriod,
    additionalContributions,
    returnRate,
    evaluationPeriod,
  );

  console.log(returnArray);
}

calculateButton.addEventListener('submit', renderProgression);
