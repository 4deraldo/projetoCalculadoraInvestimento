// contrato
// 1- Sistema deve usar o Tailwindcss
// 2- sistema deve conter um elemento html do tipo table com id definido preparado e em informaçõess dentro
// 3- sao necesarios dois arrays para a geração da tabela
//    3.1 um array de dados
//    3.2 um array com objetos que caracterizam as colunas
//     3.2 não é necessário, mass pode-se passar uma formatação de dados naquela coluna

const isNonEmptyArray = (arrayElement) => {
  return Array.isArray(arrayElement) && arrayElement.length > 0;
};
export const createTable = (columnsArray, dataArray, tableID) => {
  if (
    !isNonEmptyArray(columnsArray) ||
    !isNonEmptyArray(dataArray) ||
    !tableID
  ) {
    throw new Error(
      'Para a correta execução da linhas, precimos de um array com as colunas, outro com a informações da linha e um ID da tabela selecionada',
    );
  }
  const tableElement = document.getElementById(tableID);

  tableElement.innerHTML = '';

  if (!tableElement || tableElement.nodeName !== 'TABLE') {
    throw new Error('Id informado não corresponde a nenhum elemento table');
  }

  createTableHeader(tableElement, columnsArray);
  createTableBody(tableElement, dataArray, columnsArray);
};

function createTableHeader(tableReference, columnsArray) {
  function createTheHeadElement() {
    const thead = document.createElement('thead');
    tableReference.appendChild(thead);
    return thead;
  }
  const tableTheaderReference =
    tableReference.querySelector('thead') ??
    createTheHeadElement(tableReference);

  const headerRow = document.createElement('tr');
  ['bg-blue-900', 'text-slate-200', 'sticky', 'top-0'].forEach((cssClass) =>
    headerRow.classList.add(cssClass),
  );
  for (const tableComlumnObject of columnsArray) {
    const headerElement = /*html*/ `<th class='text-center'>${tableComlumnObject.columnLabel}</th>`;
    headerRow.innerHTML += headerElement;
  }
  tableTheaderReference.appendChild(headerRow);
}
function createTableBody(tableReference, tableItems, columnsArray) {
  function createTbodyElement() {
    const tbody = document.createElement('tbody');
    tableReference.appendChild(tbody);
    return tbody;
  }
  const tableTBodyReference =
    tableReference.querySelector('tbody') ?? createTbodyElement(tableReference);

  for (const [itemIndex, tableItem] of tableItems.entries()) {
    const tableRow = document.createElement('tr');
    if (itemIndex % 2 !== 0) {
      tableRow.classList.add('bg-blue-200');
    }
    for (const tableColumn of columnsArray) {
      const formartFunction = tableColumn.format ?? ((info) => info);
      tableRow.innerHTML += /*html */ `<td class='text-center'>${formartFunction(tableItem[tableColumn.accessor])}</td>`;
    }
    tableTBodyReference.appendChild(tableRow);
  }
}
