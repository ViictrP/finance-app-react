import { CardList, Header } from '../components';
import { ShoppingBag } from 'phosphor-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/slices/userSlice';
import { currencyFormatter } from '../helpers/currencyFormatter';

const InvoicePage = () => {
  const storedUser = useSelector(selectUser);
  const [transactions, setTransactions] = useState<any>([]);
  const [invoice, setInvoice] = useState<any>();

  useEffect(() => {
    if (storedUser.profile && !storedUser.isLoadingProfile) {
      const creditCard = storedUser.profile.creditCards[1];
      const __invoice = creditCard.invoices.filter(invoice => invoice.transactions.length > 0)[0];
      setInvoice(__invoice);
    }
  }, [storedUser.profile, storedUser.isLoadingProfile]);

  useEffect(() => {
    if (invoice && invoice.transactions) {
      const __transactions = invoice.transactions.map((transaction: any) => ({
        key: transaction.id,
        header: transaction.category,
        content: transaction.description,
        footer: currencyFormatter(transaction.amount),
      }));
      setTransactions(__transactions);
    }
  }, [invoice]);

  return (
    <div className="page-container">
      <Header showBackButton={true} />
      <p className="text-sm">Cartão <b>Porto</b></p>
      <p className="text-xl">Fatura de julho</p>
      <CardList
        content={transactions}
        icon={<ShoppingBag size="30" className="mr-4 ml-1" weight="fill" />}
      />
    </div>
  );
};

export default InvoicePage;
