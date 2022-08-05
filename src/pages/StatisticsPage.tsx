import { Datepicker, Header } from '../components';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/slices/userSlice';
import { currencyFormatter } from '../helpers/currencyFormatter';
import { Money, Receipt, Wallet } from 'phosphor-react';
import { MONTHS } from '../utils/months.enum';

const StatisticsPage = () => {
  const storedUser = useSelector(selectUser);
  const [balance, setBalance] = useState(0);
  const [expensesAmount, setExpensesAmount] = useState(0);
  const [balancePercentage, setBalancePercentage] = useState(0);
  const [expensesPercentage, setExpensesPercentage] = useState(0);

  const onDatepickerChangeHandler = (date: Date) => {
    calculateExpensesAndBalance(date);
  };

  const calculateExpensesAndBalance = (date: Date) => {
    if (storedUser.profile) {
      const salary = storedUser.profile.salary;
      const debitAmount = storedUser.profile.transactions.reduce((sum, current) => sum + Number(current.amount), 0);
      const creditCardsAmount = storedUser.profile.creditCards.reduce((sum, current) => {
        const invoice = current.invoices.filter(invoice => invoice.month === MONTHS[date.getMonth()])[0];
        const amount = invoice.transactions.reduce((sum, current) => {
          return sum + Number(current.amount);
        }, 0);
        return sum + Number(amount);
      }, 0);

      const __expensesAmount = debitAmount + creditCardsAmount;
      const balanceAmount = Number(salary) - __expensesAmount;

      setExpensesAmount(__expensesAmount);
      setBalance(balanceAmount);
    }
  };

  useEffect(() => {
    if (storedUser.profile && balance && expensesAmount) {
      const salary = storedUser.profile.salary;
      const balancePercentage = Math.trunc((balance * 100) / salary);
      const expensesPercentage = Math.trunc((expensesAmount * 100) / salary);

      setBalancePercentage(balancePercentage);
      setExpensesPercentage(expensesPercentage);
    }
  }, [balance, expensesAmount, storedUser.profile]);

  useEffect(() => {
    if (!storedUser.isLoadingProfile && storedUser.profile) {
      calculateExpensesAndBalance(new Date());
    }
  }, [storedUser.profile, storedUser.isLoadingProfile]);

  return (
    <div className="page-container">
      <Header showBackButton={true} />
      <h1 className="text-2xl font-bold my-5">Estatísticas do mês</h1>
      <Datepicker config={{ showOnlyMonths: true }} onChange={onDatepickerChangeHandler} />
      <div
        id="content"
        className="mt-4 w-full h-auto bg-white dark:bg-zinc-900 rounded-b-lg">
        <div id="balance-container" className="p-4 w-full">
          <div className="flex flex-row items-center gap-2">
            <Wallet size={20} />
            <p className="text-lg">
              salário <span className="text-blue-400 font-bold">{currencyFormatter(storedUser.profile!.salary)}</span>
            </p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <Money size={20} />
            <p className="text-lg">
              disponível <span className="text-emerald-400 font-bold">{currencyFormatter(balance)}</span>
            </p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <Receipt size={20} />
            <p className="text-lg">gasto <span className="text-red-400 font-bold">{currencyFormatter(expensesAmount)}</span></p>
          </div>
          <div className="w-full flex flex-row items-center h-[30px] mt-5 mb-2 p-[5px] bg-zinc-800 rounded-full">
            <div
              className={`bg-emerald-400 h-full transition ease-in-out transition-all`}
              style={{
                width: `${balancePercentage}%`,
                borderTopLeftRadius: '20px',
                borderBottomLeftRadius: '20px'
              }}
            />
            <div
              className={`bg-red-500 h-full rounded-r-full transition ease-in-out transition-all`}
              style={{
                width: `${expensesPercentage}%`,
                borderTopRightRadius: '20px',
                borderBottomRightRadius: '20px'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
