const intl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

export const currencyFormatter = (value: number | string): string => {
  return intl.format(Number(value));
};
