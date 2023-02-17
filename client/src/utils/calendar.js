export default function CalendarControl() {
  const calendar = new Date();
  const calendarControl = {
    localDate: new Date(),
    prevMonthLastDate: null,
    calWeekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    calMonthName: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],

    daysInMonth(month, year) {
      return new Date(year, month, 0).getDate();
    },

    firstDay() {
      return new Date(calendar.getFullYear(), calendar.getMonth(), 1);
    },
    lastDay() {
      return new Date(calendar.getFullYear(), calendar.getMonth() + 1, 0);
    },

    firstDayNumber() {
      return calendarControl.firstDay().getDay() + 1;
    },
    lastDayNumber() {
      return calendarControl.lastDay().getDay() + 1;
    },

    getPreviousMonthLastDate() {
      const lastDate = new Date(calendar.getFullYear(), calendar.getMonth(), 0).getDate();
      return lastDate;
    },
    navigateToPreviousMonth() {
      calendar.setMonth(calendar.getMonth() - 1);
      calendarControl.attachEventsOnNextPrev();
    },
    navigateToNextMonth() {
      calendar.setMonth(calendar.getMonth() + 1);
      calendarControl.attachEventsOnNextPrev();
    },
    navigateToCurrentMonth() {
      const currentMonth = calendarControl.localDate.getMonth();
      const currentYear = calendarControl.localDate.getFullYear();

      calendar.setMonth(currentMonth);
      calendar.setYear(currentYear);
      calendarControl.attachEventsOnNextPrev();
    },

    displayYear() {
      const yearLabel = document.querySelector('.calendar .calendar-year-label');
      yearLabel.innerHTML = calendar.getFullYear();
    },
    displayMonth() {
      const monthLabel = document.querySelector('.calendar .calendar-month-label');
      monthLabel.innerHTML = calendarControl.calMonthName[calendar.getMonth()];
    },
    selectDate(e) {
      return `${calendar.getFullYear()}-${calendar.getMonth()}-${e.target.textContent}`;
    },

    plotSelectors() {
      document.querySelector(
        '.calendar',
      ).innerHTML += `<div class="calendar-inner"><div class="calendar-controls">
        <div class="calendar-prev"><a><svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><path fill="#666" d="M88.2 3.8L35.8 56.23 28 64l7.8 7.78 52.4 52.4 9.78-7.76L45.58 64l52.4-52.4z"/></svg></a></div>
        <div class="calendar-year-month">
        <div class="calendar-year-label"></div>
        <div class="calendar-month-label"></div>
        </div>
        <div class="calendar-next"><a><svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><path fill="#666" d="M38.8 124.2l52.4-52.42L99 64l-7.77-7.78-52.4-52.4-9.8 7.77L81.44 64 29 116.42z"/></svg></a></div>
        </div>
        <div class="calendar-body"></div></div>`;
    },

    plotDayNames() {
      for (let i = 0; i < calendarControl.calWeekDays.length; i++) {
        document.querySelector(
          '.calendar .calendar-body',
        ).innerHTML += `<div>${calendarControl.calWeekDays[i]}</div>`;
      }
    },

    plotDates() {
      document.querySelector('.calendar .calendar-body').innerHTML = '';
      calendarControl.plotDayNames();
      calendarControl.displayMonth();
      calendarControl.displayYear();
      let count = 1;
      let prevDateCount = 0;

      calendarControl.prevMonthLastDate = calendarControl.getPreviousMonthLastDate();
      const prevMonthDatesArray = [];
      const calendarDays = calendarControl.daysInMonth(
        calendar.getMonth() + 1,
        calendar.getFullYear(),
      );

      for (let i = 1; i < calendarDays; i++) {
        if (i < calendarControl.firstDayNumber()) {
          prevDateCount += 1;
          document.querySelector(
            '.calendar .calendar-body',
          ).innerHTML += `<div class="prev-dates"></div>`;
          prevMonthDatesArray.push(calendarControl.prevMonthLastDate--);
        } else {
          document.querySelector(
            '.calendar .calendar-body',
          ).innerHTML += `<div class="number-item" data-num=${count}><a class="dateNumber">${count++}</a></div>`;
        }
      }

      for (let j = 0; j < prevDateCount + 1; j++) {
        document.querySelector(
          '.calendar .calendar-body',
        ).innerHTML += `<div class="number-item" data-num=${count}><a class="dateNumber">${count++}</a></div>`;
      }
      calendarControl.highlightToday();
      calendarControl.plotPrevMonthDates(prevMonthDatesArray);
      calendarControl.plotNextMonthDates();
    },

    attachEvents() {
      const prevBtn = document.querySelector('.calendar .calendar-prev a');
      const nextBtn = document.querySelector('.calendar .calendar-next a');
      const dateNumber = document.querySelectorAll('.calendar .dateNumber');
      prevBtn.addEventListener('click', calendarControl.navigateToPreviousMonth);
      nextBtn.addEventListener('click', calendarControl.navigateToNextMonth);

      for (let i = 0; i < dateNumber.length; i++) {
        dateNumber[i].addEventListener('click', calendarControl.selectDate, false);
      }
    },

    highlightToday() {
      const currentMonth = calendarControl.localDate.getMonth() + 1;
      const changedMonth = calendar.getMonth() + 1;
      const currentYear = calendarControl.localDate.getFullYear();
      const changedYear = calendar.getFullYear();
      if (
        currentYear === changedYear &&
        currentMonth === changedMonth &&
        document.querySelectorAll('.number-item')
      ) {
        document
          .querySelectorAll('.number-item')
          [calendar.getDate() - 1].classList.add('calendar-today');
      }
    },
    plotPrevMonthDates(dates) {
      dates.reverse();
      for (let i = 0; i < dates.length; i++) {
        if (document.querySelectorAll('.prev-dates')) {
          document.querySelectorAll('.prev-dates')[i].textContent = dates[i];
        }
      }
    },
    plotNextMonthDates() {
      const childElemCount = document.querySelector('.calendar-body').childElementCount;
      if (childElemCount > 42) {
        const diff = 49 - childElemCount;
        calendarControl.loopThroughNextDays(diff);
      }

      if (childElemCount > 35 && childElemCount <= 42) {
        const diff = 42 - childElemCount;
        calendarControl.loopThroughNextDays(42 - childElemCount);
      }
    },

    loopThroughNextDays(count) {
      if (count > 0) {
        for (let i = 1; i <= count; i++) {
          document.querySelector(
            '.calendar-body',
          ).innerHTML += `<div class="next-dates">${i}</div>`;
        }
      }
    },

    attachEventsOnNextPrev() {
      calendarControl.plotDates();
      calendarControl.attachEvents();
    },

    init() {
      calendarControl.plotSelectors();
      calendarControl.plotDates();
      calendarControl.attachEvents();
    },
  };
  calendarControl.init();
}
