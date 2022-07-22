import pt from 'date-fns/locale/pt';
import { useEffect, useState } from 'react';
import { addMonths, addYears, format, getDay, getDaysInMonth, isEqual, subMonths, subYears } from 'date-fns';
import { Calendar } from 'phosphor-react';

type DatepickerType = 'date' | 'month' | 'year';

interface DatepickerConfig {
  showOnlyMonths: boolean;
}

interface DatepickerProps {
  onChange?: (date: Date) => void;
  config?: DatepickerConfig;
}

const Datepicker = ({ onChange, config }: DatepickerProps) => {
  const DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
  const [dayCount, setDayCount] = useState<Array<number>>([]);
  const [blankDays, setBlankDays] = useState<Array<number>>([]);
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [datepickerHeaderDate, setDatepickerHeaderDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [type, setType] = useState<DatepickerType>('date');

  const decrement = () => {
    switch (type) {
      case 'date':
        setDatepickerHeaderDate((prev) => subMonths(prev, 1));
        break;
      case 'month':
        setDatepickerHeaderDate((prev) => subYears(prev, 1));
        break;
      case 'year':
        setDatepickerHeaderDate((prev) => subMonths(prev, 1));
        break;
    }
  };

  const increment = () => {
    switch (type) {
      case 'date':
        setDatepickerHeaderDate((prev) => addMonths(prev, 1));
        break;
      case 'month':
        setDatepickerHeaderDate((prev) => addYears(prev, 1));
        break;
      case 'year':
        setDatepickerHeaderDate((prev) => subMonths(prev, 1));
        break;
    }
  };

  const isToday = (date: number) => {
    const now = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), date);
    now.setHours(0, 0, 0, 0);
    const selected = selectedDate;
    selected.setHours(0, 0, 0, 0);
    return isEqual(now, selected);
  };

  const setDateValue = (date: number) => () => {
    const selected = new Date(
      datepickerHeaderDate.getFullYear(),
      datepickerHeaderDate.getMonth(),
      date
    );
    setSelectedDate(selected);
    setShowDatepicker(false);
  };

  const getDayCount = (date: Date) => {
    let daysInMonth = getDaysInMonth(date);

    // find where to start calendar day of week
    let dayOfWeek = getDay(new Date(date.getFullYear(), date.getMonth(), 1));
    let blankdaysArray = [];
    for (let i = 1; i <= dayOfWeek; i++) {
      blankdaysArray.push(i);
    }

    let daysArray = [];
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }

    setBlankDays(blankdaysArray);
    setDayCount(daysArray);
  };

  const isSelectedMonth = (month: number) =>
    isEqual(
      new Date(selectedDate.getFullYear(), month, selectedDate.getDate()),
      selectedDate
    );

  const setMonthValue = (month: number) => () => {
    const date = new Date(
      datepickerHeaderDate.getFullYear(),
      month,
      datepickerHeaderDate.getDate()
    );
    setDatepickerHeaderDate(date);
    setType(config?.showOnlyMonths ? 'month' : 'date');
    if (config?.showOnlyMonths) {
      setSelectedDate(date);
      setShowDatepicker(false);
    }
  };

  const toggleDatepicker = () => setShowDatepicker((prev) => !prev);

  const showMonthPicker = () => setType('month');

  const showYearPicker = () => setType('date');

  useEffect(() => {
    getDayCount(datepickerHeaderDate);
  }, [datepickerHeaderDate]);

  useEffect(() => {
    onChange && onChange(selectedDate);
  }, [selectedDate]);

  return (
    <div className="relative">
      <input type="hidden" name="date" />
      <div
        className="flex flex-row items-center bg-zinc-900 gap-2 cursor-pointer w-full px-2 py-4 leading-none rounded-md shadow-sm border-transparent focus:outline-none focus:shadow-outline text-zinc-600 dark:text-white font-medium"
        onClick={toggleDatepicker}>
        <Calendar size={24} />
        {format(selectedDate, !config?.showOnlyMonths ? 'dd/MM/yyyy' : 'MMMM/yyyy', { locale: pt })}
      </div>
      {showDatepicker && (
        <div
          className="w-full bg-white mt-12 rounded-lg shadow p-4 absolute top-0 left-0 z-10 dark:bg-zinc-900 border-[0.5px] dark:text-white dark:border-zinc-800">
          <div className="flex justify-between items-center mb-2">
            <div>
              <button
                type="button"
                className="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-zinc-200 p-1 rounded-full"
                onClick={decrement}>
                <svg
                  className="h-6 w-6 text-zinc-500 dark:text-white inline-flex"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            </div>
            {type === 'date' && (
              <div
                onClick={showMonthPicker}
                className="flex-grow p-1 text-lg font-bold text-zinc-800 dark:text-white cursor-pointer hover:bg-zinc-200 rounded-lg">
                <p className="text-center">
                  {format(datepickerHeaderDate, 'MMMM', { locale: pt })}
                </p>
              </div>
            )}
            <div
              onClick={showYearPicker}
              className="flex-grow p-1 text-lg font-bold text-zinc-800 dark:text-white cursor-pointer hover:bg-zinc-200 rounded-lg">
              <p className="text-center">
                {format(datepickerHeaderDate, 'yyyy')}
              </p>
            </div>
            <div>
              <button
                type="button"
                className="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-zinc-200 p-1 rounded-full"
                onClick={increment}>
                <svg
                  className="h-6 w-6 text-zinc-500 dark:text-white inline-flex"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
          {type === 'date' && !config?.showOnlyMonths && (
            <>
              <div className="flex flex-wrap mb-3 -mx-1">
                {DAYS.map((day, i) => (
                  <div
                    key={i}
                    style={{ width: '14.26%' }}
                    className="px-1">
                    <div className="text-zinc-800 dark:text-white font-medium text-center text-xs">
                      {day}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap -mx-1">
                {blankDays.map((_, i) => (
                  <div
                    key={i}
                    style={{ width: '14.26%' }}
                    className="text-center border p-1 border-transparent text-sm"
                  ></div>
                ))}
                {dayCount.map((d, i) => (
                  <div
                    key={i}
                    style={{ width: '14.26%' }}
                    className="px-1 mb-1">
                    <div
                      onClick={setDateValue(d)}
                      className={`cursor-pointer text-center text-sm leading-none rounded-full leading-loose transition ease-in-out duration-100 ${
                        isToday(d)
                          ? 'bg-blue-500 text-white'
                          : 'text-zinc-700 dark:text-white hover:bg-blue-200'
                      }`}>
                      {d}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          {type === 'month' && (
            <div className="flex flex-wrap -mx-1">
              {Array(12)
                .fill(null)
                .map((_, i) => (
                  <div
                    key={i}
                    onClick={setMonthValue(i)}
                    style={{ width: '25%' }}>
                    <div
                      className={`cursor-pointer p-5 font-semibold text-center text-sm rounded-lg hover:bg-zinc-200 ${
                        isSelectedMonth(i)
                          ? 'bg-blue-500 text-white'
                          : 'text-zinc-700 dark:text-white hover:bg-blue-200'
                      }`}>
                      {format(
                        new Date(
                          datepickerHeaderDate.getFullYear(),
                          i,
                          datepickerHeaderDate.getDate()
                        ),
                        'MMM', { locale: pt }
                      )}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Datepicker;
