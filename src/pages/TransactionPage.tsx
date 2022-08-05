import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/slices/userSlice';
import { Transaction } from '../entities';
import { Card, Header } from '../components';

const TransactionPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transaction, setTransaction] = useState<Transaction | null>();
  const storedUser = useSelector(selectUser);

  useEffect(() => {
    if (!storedUser.isLoadingProfile && storedUser.profile) {
      const transactionId = location.pathname.split('/')[2];
      let transactions = storedUser.profile.creditCards
        .map(creditCard => creditCard.invoices)
        .map(invoices => invoices.map(invoice => invoice.transactions))
        .flatMap(transactions => transactions[0]);

      transactions = transactions.concat(storedUser.profile.transactions);
      const __transaction = transactions.find(transaction => transaction.id === transactionId) as Transaction;
      setTransaction(__transaction);
    }
  }, [storedUser.profile, storedUser.isLoadingProfile]);

  return (
    <div className="page-container">
      <Header showBackButton={true} />
      {
        transaction &&
        <Card key={transaction.id}>
          <div>
            <p>descrição: {transaction.description}</p>
            <p>quantidade de parcelas: {transaction.installmentAmount}</p>
            <p>categoria: {transaction.category}</p>
            <p>valor: {transaction.amount}</p>
            <p>valor total: {transaction.amount * transaction.installmentAmount}</p>
          </div>
        </Card>
      }
    </div>
  );
};

export default TransactionPage;
