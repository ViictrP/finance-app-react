import { CardList, Datepicker, Header } from '../components';
import { ShoppingBag } from 'phosphor-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/slices/userSlice';
import { currencyFormatter } from '../helpers/currencyFormatter';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

const InvoicePage = () => {
  const today = new Date();
  const storedUser = useSelector(selectUser);
  const [transactions, setTransactions] = useState<any>([]);
  const [invoice, setInvoice] = useState<any>();
  const [selectedDate, setSelectedDate] = useState(today);

  const onDatepickerChangeHandler = (date: Date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    if (storedUser.profile && !storedUser.isLoadingProfile) {
      const creditCard = storedUser.profile.creditCards[0];
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
        footer: currencyFormatter(transaction.amount)
      }));
      setTransactions(__transactions);
    }
  }, [invoice]);

  useEffect(() => {
    // TODO buscar transações do cartão na data especifica
    console.log(selectedDate);
  }, [selectedDate]);

  return (
    <div className="page-container">
      <Header showBackButton={true} />
      <div className=" flex flex-col gap-8 mt-10">
        <div className="flex flex-col gap-2">
          <p className="text-sm">Cartão <b>Porto</b></p>
          <Datepicker config={{ showOnlyMonths: true }} onChange={onDatepickerChangeHandler} />
        </div>
        <div className="">
          <p className="text-xl">Fatura de {format(selectedDate, 'MMMM/yyyy', { locale: pt })}</p>
          <CardList
            content={transactions}
            icon={<ShoppingBag size="30" className="mr-4 ml-1" weight="fill" />}
          />
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
