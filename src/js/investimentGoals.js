function convertToMounthflyRetornRate(yearReturnRate) {
  return yearReturnRate ** (1 / 12);
}

function generateReturnArra(
  startingAmount = 0,
  timeHorizon = 0,
  timePeriod = 'monthfly',
  monthflyContribution = 0,
  returnRate = 0,
  returnTimeFrame = 'monthfly ',
) {
  if (!timeHorizon || !startingAmount) {
    throw new Error(
      'Investimento Inicial e prazo devem ser preenchidos com valores positivos',
    );
  }
  const finalReturnRate =
    returnTimeFrame === 'monthfly'
      ? 1 + returnRate / 100
      : convertToMounthflyRetornRate(1 + returnRate / 100);

  const finalTimeHorizon =
    timeHorizon === 'monthfly' ? timeHorizon : timeHorizon * 12;

  const referenceInvestimentObject = {
    investedAmount: startingAmount,
    interestReturn: 0,
    totalIntererstReturn: 0,
    mounth: 0,
    totalAmount: startingAmount,
  };
  const returnArray = [referenceInvestimentObject];

  for (
    let timeReference = 1;
    timeReference <= finalTimeHorizon;
    timeReference++
  ) {
    const totalAmount =
      returnArray[timeReference - 1].totalAmount * finalReturnRate +
      monthflyContribution;

    const interestReturn =
      returnArray[timeReference - 1].totalAmount * finalReturnRate;

    const investedAmount =
      startingAmount + monthflyContribution * timeReference;

    const totalIntererstReturn = totalAmount - investedAmount;

    returnArray.push({
      investedAmount,
      interestReturn,
      totalIntererstReturn,
      mounth: timeReference,
      totalAmount,
    });
  }

  return returnArray;
}
