import '../style/style.css';
import { generateReturnArray } from './investimentGoals.js';

const form = document.getElementById('investmentForm');
const btnClearForm = document.getElementById('btnClearForm');

function renderProgression(event) {
  event.preventDefault();
  if (document.querySelector('.error')) {
    return;
  }

  const startingAmount = Number(
    document.getElementById('initialInvestment').value.replace(',', '.'),
  );

  const additionalContributions = Number(
    document.getElementById('additionalContributions').value.replace(',', '.'),
  );

  const investmentTime = Number(
    document.getElementById('investmentTime').value.replace(',', '.'),
  );

  const investmentTimePeriod = document.getElementById(
    'investmentTimePeriod',
  ).value;

  const returnRate = Number(
    document.getElementById('returnRate').value.replace(',', '.'),
  );

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

function clearForm() {
  form['initialInvestment'].value = '';
  form['investmentTime'].value = '';
  form['additionalContributions'].value = '';
  form['returnRate'].value = '';
  form['taxRate'].value = '';

  // const errorInputsContainers = document.querySelectorAll('p');

  form.querySelectorAll('.error').forEach((el) => {
    el.classList.remove('error');
  });
  form.querySelectorAll('p').forEach((p) => p.remove());
}

function validateInput(event) {
  if (event.target.value === '') {
    return;
  }

  const { parentElement } = event.target;
  const grandParent = event.target.parentElement.parentElement;
  const inputValue = event.target.value.replace(',', '.');

  if (
    !parentElement.classList.contains('error') &&
    (isNaN(inputValue) || Number(inputValue) <= 0)
  ) {
    const errorTextElement = document.createElement('p');
    errorTextElement.classList.add('text-red-500', 'text-[14px]');
    errorTextElement.innerText = 'Insira um valor numérico maior que zero';

    parentElement.classList.add('error');
    grandParent.appendChild(errorTextElement);
  } else if (
    parentElement.classList.contains('error') &&
    !isNaN(inputValue) &&
    Number(inputValue) > 0
  ) {
    parentElement.classList.remove('error');
    grandParent.querySelector('p').remove();
  }
}

for (const formElement of form) {
  if (formElement.tagName === 'INPUT' && formElement.hasAttribute('name')) {
    formElement.addEventListener('blur', validateInput);
  }
}

form.addEventListener('submit', renderProgression);
btnClearForm.addEventListener('click', clearForm);
