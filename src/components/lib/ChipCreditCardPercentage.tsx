import { CreditCard } from '../../entities';
import { MONTHS } from '../../utils/months.enum';
import { Link } from 'react-router-dom';
import React from 'react';

interface ChipCreditCardPercentageProps {
  creditCards?: CreditCard[];
  date: Date;
  expensesAmount: number;
}

const ChipCreditCardPercentage = ({ creditCards, date, expensesAmount }: ChipCreditCardPercentageProps) => {

  if (!creditCards || !date || !expensesAmount) {
    return <></>;
  }

  return (
    <div id="credit-card-impact" className="carousel-chip">
      {
        creditCards.map(creditCard => {
          const invoice = creditCard.invoices.find(invoice => invoice.month === MONTHS[date.getMonth()]);
          if (!invoice) return '';
          const amount = invoice.transactions.reduce((sum, current) => {
            return sum + Number(current.amount);
          }, 0);
          const percent = parseFloat(`${(amount / expensesAmount) * 100}`).toFixed(2);
          return (
            <Link
              key={creditCard.id}
              to={`/invoices/${creditCard.id}`}
              className={`carousel-chip-item ${creditCard.backgroundColor}`}>
              <p className="text-sm">{creditCard.title} <span className="font-bold text-md">{percent}</span>%</p>
            </Link>
          );
        })
      }
    </div>
  );
};

export default ChipCreditCardPercentage;
