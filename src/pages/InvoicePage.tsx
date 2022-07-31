import { CardList, Datepicker, Header } from '../components';
import { Receipt, ShoppingBag } from 'phosphor-react';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/slices/userSlice';
import { currencyFormatter } from '../helpers/currencyFormatter';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { selectInvoice } from '../store/slices/invoiceSlice';
import { useAppDispatch } from '../app/hook';
import { getInvoiceThunk } from '../store/thunks';
import { useLocation } from 'react-router-dom';
import { CreditCard } from '../entities';

const InvoicePage = () => {
  const today = new Date();
  const storedUser = useSelector(selectUser);
  const dispatch = useAppDispatch();
  const storedInvoice = useSelector(selectInvoice);
  const [transactions, setTransactions] = useState<any>([]);
  const [invoice, setInvoice] = useState<any>();
  const [selectedDate, setSelectedDate] = useState(today);
  const [totalAmount, setTotalAmount] = useState(0);
  const [creditCard, setCreditCard] = useState<CreditCard>();
  const location = useLocation();

  const onDatepickerChangeHandler = useCallback((date: Date) => {
    const month = format(date, 'MMM', { locale: pt });
    const currentMonth = format(selectedDate, 'MMM', { locale: pt });
    if (month !== currentMonth) {
      setSelectedDate(date);
      if (creditCard) {
        const __invoice = {
          creditCard: { id: creditCard.id },
          month: format(date, 'MMM', { locale: pt }).toUpperCase(),
          year: format(date, 'yyyy', { locale: pt }),
        } as any;
        dispatch(getInvoiceThunk(__invoice));
      }
    }
  }, [creditCard, selectedDate]);

  useEffect(() => {
    if (storedUser.profile && !storedUser.isLoadingProfile) {
      const creditCardId = location.pathname.split('/')[2];
      const creditCard = storedUser.profile.creditCards.filter(({ id }) => creditCardId === id)[0];
      setCreditCard(creditCard);
    }
  }, [storedUser.profile, storedUser.isLoadingProfile]);

  useEffect(() => {
    if (creditCard) {
      const month = format(today, 'MMM', { locale: pt });
      const __invoice = creditCard.invoices.filter(invoice => invoice.month === month.toUpperCase())[0];
      setInvoice(__invoice);
    }
  }, [creditCard]);

  useEffect(() => {
    if (invoice && invoice.transactions) {
      const __transactions = invoice.transactions.map((transaction: any) => ({
        key: transaction.id,
        header: transaction.category,
        content: `${transaction.description} (${transaction.installmentNumber}/${transaction.installmentAmount})`,
        footer: currencyFormatter(transaction.amount),
      }));
      setTransactions(__transactions);
      const sum = invoice.transactions.reduce((sum: number, current: any) => sum + Number(current.amount), 0);
      setTotalAmount(sum);
    }
  }, [invoice]);

  useEffect(() => {
    setTransactions([]);
    setTotalAmount(0);
    if (storedInvoice.invoice && !storedInvoice.isLoading) {
      setInvoice(storedInvoice.invoice);
    }
  }, [storedInvoice.invoice, storedInvoice.isLoading]);

  return (
    <div className="page-container">
      <Header showBackButton={true} />
      <div className=" flex flex-col gap-8 mt-10">
        <div className="flex flex-col gap-2">
          <p className="text-xl">Cartão <b>{creditCard?.title}</b></p>
          <Datepicker config={{ showOnlyMonths: true }} onChange={onDatepickerChangeHandler} />
        </div>
        <div className="h-full">
          <div className="flex flex-row items-center justify-between">
            <p className="text-md">Fatura de {format(selectedDate, 'MMMM/yyyy', { locale: pt })}</p>
            { totalAmount > 0 && <p className="text-2xl font-bold">{currencyFormatter(totalAmount)}</p> }
          </div>
          {
            transactions.length > 0 &&
            <CardList
              content={transactions}
              icon={<ShoppingBag size="30" className="ml-1" weight="fill" />}
            />
          }
          {
            transactions.length === 0 &&
            <div className="flex flex-col justify-center items-center h-[200px] text-zinc-600">
              <Receipt size={50} weight="thin" />
              não há lançamentos nesta fatura...
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
