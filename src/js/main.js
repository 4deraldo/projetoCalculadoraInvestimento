import '../style/style.css';
import { generateReturnArray } from './investimentGoals.js';
import { Chart } from 'chart.js/auto';
import { createTable } from './table.js';

// grafico
const finalMoneyChart = document.getElementById('finalMoneyDistribution');
const progressionChart = document.getElementById('progression');
let doughnutChartReference = {};
let barChartReference = {};

// tabela

const columsArray = [
  { columnLabel: 'Mês', accessor: 'month' },
  {
    columnLabel: 'Total investido',
    accessor: 'investedAmount',
    format: (numberInfo) => formartCurrencyTable(numberInfo),
  },
  {
    columnLabel: 'Rendimento mensal',
    accessor: 'interestReturn',
    format: (numberInfo) => formartCurrencyTable(numberInfo),
  },
  {
    columnLabel: 'Rendimento total',
    accessor: 'totalInterestReturn',
    format: (numberInfo) => formartCurrencyTable(numberInfo),
  },
  {
    columnLabel: 'Quantia total',
    accessor: 'totalAmount',
    format: (numberInfo) => formartCurrencyTable(numberInfo),
  },
];

// formulario
const form = document.getElementById('investmentForm');
const btnClearForm = document.getElementById('btnClearForm');

function formartCurrencyTable(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
function formartCurrencyGraph(value) {
  return value.toFixed(2);
}

function renderProgression(event) {
  event.preventDefault();
  if (document.querySelector('.error')) {
    return;
  }
  resetChart();
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

  const taxRate = Number(
    document.getElementById('taxRate').value.replace(',', '.'),
  );

  const returnArray = generateReturnArray(
    startingAmount,
    investmentTime,
    investmentTimePeriod,
    additionalContributions,
    returnRate,
    evaluationPeriod,
  );

  const finalinvestimentObject = returnArray[returnArray.length - 1];

  doughnutChartReference = new Chart(finalMoneyChart, {
    type: 'doughnut',
    data: {
      labels: ['Total investido', 'Rendimento', 'Imposto'],
      datasets: [
        {
          data: [
            formartCurrencyGraph(finalinvestimentObject.investedAmount),
            formartCurrencyGraph(
              finalinvestimentObject.totalInterestReturn * (1 - taxRate / 100),
            ),
            formartCurrencyGraph(
              finalinvestimentObject.totalInterestReturn * (taxRate / 100),
            ),
          ],
          backgroundColor: [
            'rgb(255, 205, 86)',
            'rgb(54, 162, 235)',
            'rgb(255, 99, 132)',
          ],
          hoverOffset: 4,
        },
      ],
    },
  });

  barChartReference = new Chart(progressionChart, {
    type: 'bar',
    data: {
      labels: returnArray.map((investimentObeject) => investimentObeject.month),
      datasets: [
        {
          label: 'Total Investido',
          data: returnArray.map((investimentObeject) =>
            formartCurrencyGraph(investimentObeject.investedAmount),
          ),
          backgroundColor: 'rgb(255, 205, 86)',
        },
        {
          label: 'Retorno de investimento',
          data: returnArray.map((investimentObeject) =>
            formartCurrencyGraph(investimentObeject.interestReturn),
          ),
          backgroundColor: 'rgb(54, 162, 235)',
        },
      ],
    },
    options: {
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    },
  });

  createTable(columsArray, returnArray, 'resultsTable');
}

function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function resetChart() {
  if (
    !isObjectEmpty(doughnutChartReference) &&
    !isObjectEmpty(barChartReference)
  ) {
    doughnutChartReference.destroy();
    barChartReference.destroy();
  }
}
function clearForm() {
  form['initialInvestment'].value = '';
  form['investmentTime'].value = '';
  form['additionalContributions'].value = '';
  form['returnRate'].value = '';
  form['taxRate'].value = '';

  resetChart();

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

const mainEl = document.querySelector('main');
const carouselEl = document.querySelector('#carousel');
const nextButton = document.querySelector('#slideArrowNext');
const previousButton = document.querySelector('#slideArrowPrevious');

nextButton.addEventListener('click', () => {
  carouselEl.scrollLeft += mainEl.clientWidth;
});
previousButton.addEventListener('click', () => {
  carouselEl.scrollLeft -= mainEl.clientWidth;
});
form.addEventListener('submit', renderProgression);
btnClearForm.addEventListener('click', clearForm);
