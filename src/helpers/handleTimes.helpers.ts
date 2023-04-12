import * as dateFns from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

export const getCurrentDateByTimeZone = (formateDate = 'America/Caracas') => {
  const date = new Date();

  const converterDate = formatInTimeZone(
    date,
    formateDate,
    'yyyy-MM-dd HH:mm:ssXXX',
  );

  return converterDate;
};

export const getInitialDateOfMonth = (): Date => {
  const date = new Date(getCurrentDateByTimeZone()).setHours(0, 0, 0, 0);
  const year = new Date(date).getFullYear();
  const month = new Date(date).getMonth();
  return new Date(`${1}/${month + 1}/${year}`);
};

export const addDaysToDate = (date: Date, days: number) => {
  const newDate = dateFns.add(date, { days: days });

  newDate.setHours(0, 0, 0, 0);

  return newDate;
};
