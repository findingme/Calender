'use strict'

{
  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();

  function getCalenderHead() {
    const dates = [];
    const lastDate = new Date(year, month, 0).getDate();
    const NumberOfDates = new Date(year, month, 1).getDay();
    for (let i = 0; i < NumberOfDates; i++) {
      dates.unshift({
        date: lastDate - i,
        isToday: false,
        isDisables: true,
      });
    };
    return dates;
  };
  
  function getCalenderBody() {
    const dates = [];
    const lastDate = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= lastDate; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisables: false,
      });
    };
    if (year == today.getFullYear() && month === today.getMonth()) {
      dates[today.getDate() - 1].isToday = true;
    }
    return dates;
  };

  function getCalenderTail() {
    const dates = [];
    const NumberOfDates = 6 - new Date(year, month + 1, 0).getDay();
    for (let i = 0; i < NumberOfDates; i++) {
      dates.push({
        date: i + 1,
        isToday: false,
        isDisables: true,
      });
    };
    return dates;
  };

  function clearCalender() {
    const tbody = document.querySelector('tbody');
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    };
  };
  
  function renderTitle() {
    document.getElementById('title').textContent = `${year}/${String(month + 1).padStart(2, '0')}`;
  };
  
  function renderWeeks() {
    const dates = [
      ...getCalenderHead(),
      ...getCalenderBody(),
      ...getCalenderTail(),
    ];
    const weeks = [];
    const weeksCount = dates.length / 7;
    for (let i = 0; i < weeksCount; i++) {
      weeks.push(dates.splice(0, 7));
    };
    console.log(weeks);
    weeks.forEach(week => {
      const tr = document.createElement('tr');
      week.forEach(date => {
        const td = document.createElement('td');
        td.textContent = date.date;
        if (date.isToday) {
          td.classList.add('today');
        };
        if (date.isDisables) {
          td.classList.add('disabled');
        };
        tr.appendChild(td);
      });
      document.querySelector('tbody').appendChild(tr);
    });
  };

  function createCalender() {
    clearCalender();
    renderTitle();
    renderWeeks();
  };

  document.getElementById('prev').addEventListener('click', () => {
    month--;
    if (month < 0) {
      year--;
      month = 11;
    };
    createCalender();
  });

  document.getElementById('next').addEventListener('click', () => {
    month++;
    if (month < 11) {
      year++;
      month = 0;
    };
    createCalender();
  });

  document.getElementById('today').addEventListener('click', () => {
    year = today.getFullYear();
    month = today.getMonth();
    createCalender();
  });
  
  createCalender();
};