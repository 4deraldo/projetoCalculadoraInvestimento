function convertToMonthlyReturnRate(yearReturnRate) {
  return yearReturnRate ** (1 / 12);
}

function generateReturnArray(
  startingAmount = 0,
  timeHorizon = 0,
  timePeriod = 'monthly',
  monthlyContribution = 0,
  returnRate = 0,
  returnTimeFrame = 'monthly',
) {
  if (!timeHorizon || !startingAmount) {
    throw new Error(
      'Investimento Inicial e prazo devem ser preenchidos com valores positivos',
    );
  }

  const finalReturnRate =
    returnTimeFrame === 'monthly'
      ? 1 + returnRate / 100
      : convertToMonthlyReturnRate(1 + returnRate / 100);

  const finalTimeHorizon =
    timePeriod === 'monthly' ? timeHorizon : timeHorizon * 12;

  const reference = {
    investedAmount: startingAmount,
    interestReturn: 0,
    totalInterestReturn: 0,
    month: 0,
    totalAmount: startingAmount,
  };

  const returnArray = [reference];

  for (let i = 1; i <= finalTimeHorizon; i++) {
    const previousTotal = returnArray[i - 1].totalAmount;

    const interest = previousTotal * (finalReturnRate - 1);

    const totalAmount = previousTotal + interest + monthlyContribution;

    const investedAmount = startingAmount + monthlyContribution * i;

    const totalInterestReturn = totalAmount - investedAmount;

    returnArray.push({
      investedAmount,
      interestReturn: interest,
      totalInterestReturn,
      month: i,
      totalAmount,
    });
  }

  return returnArray;
}
