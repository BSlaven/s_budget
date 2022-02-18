// GLOBALS
const fixedAmount = 30;

// FORM ELEMENTS
const form = document.querySelector('#form');
const shopInput = document.querySelector('#shop-input');
const amountInput = document.querySelector('#amount-input');
const todayElement = document.querySelector('#today');
const allExpenses = document.querySelector('#all-expenses');

const endDayBtn = document.querySelector('#end-day-btn');
const resetMonthBtn = document.querySelector('#reset-month');

listAllExpenses();
updateAmountInHeader();
listAllDays();
setMonthState();

form.addEventListener('submit', e => {
  e.preventDefault();
  formSubmitHandler();
});

function formSubmitHandler () {
  const shopValue = shopInput.value.trim();
  const amountValue = +amountInput.value;
  if(!shopValue || amountValue < 0) return;
  pushOneExpense(shopValue, amountValue);
  listAllExpenses();
  updateAmountInHeader();
  form.reset();
}

function listAllExpenses() {
  const today = fetchTodayFromStorage();
  allExpenses.innerHTML = '';
  today.forEach(elem => {
    const expense = createExpenseCard(elem.name, elem.price, elem.id);
    allExpenses.appendChild(expense);
  })
}

function pushOneExpense(shop, amount) {
  const expense = {
    id: Math.floor(Math.random() * 100000000000),
    name: shop,
    price: amount
  };
  const today = fetchTodayFromStorage();
  today.push(expense);
  localStorage.setItem("today", JSON.stringify(today));
}

function createExpenseCard (shop, amount, id) {
  const expenseElement = document.createElement('div');
  const nameEl = createExpanseNameElement(shop);
  const amountEl = createExpenseAmountElement(amount)
  expenseElement.classList.add('one-expense');
  expenseElement.appendChild(nameEl);
  expenseElement.appendChild(amountEl);
  expenseElement.addEventListener('dblclick', () => {
    expenseElement.remove();
    let today = fetchTodayFromStorage();
    today = today.filter(elem => elem.id !== id);
    localStorage.setItem("today", JSON.stringify(today));
    updateAmountInHeader();
  })
  return expenseElement;
}

function createExpanseNameElement (name) {
  let textElement = document.createElement('p');
  textElement.textContent = name;
  textElement.classList.add('expense-name');
  return textElement;
}

function createExpenseAmountElement(amount) {
  let amountElement = document.createElement('span');
  amountElement.textContent = `${amount} KM`;
  amountElement.classList.add('spent');
  return amountElement;
}

function updateAmountInHeader() {
  const header = document.querySelector('#today-header');
  const today = fetchTodayFromStorage();
  const total = today
    .map(elem => +elem.price)
    .reduce((acc, curr) => acc + curr, 0)
    .toFixed(2);
  header.querySelector('h4').textContent = `Danas (${total})`
}

function fetchTodayFromStorage() {
  const today = JSON.parse(localStorage.getItem("today")) || [];
  return today;
}

function clearTodaysExpenses() {
  localStorage.setItem("today", JSON.stringify([]));
  allExpenses.innerHTML = '';
}

// ALL DAYS
endDayBtn.addEventListener('click', () => {
  pushDayToArray();
  listAllDays();
  clearTodaysExpenses();
  setMonthState();
});

resetMonthBtn.addEventListener('click', e => {
  resetMonthHandler();
  setMonthState();
});

function fetchAllDays() {
  const allDays = JSON.parse(localStorage.getItem("all-days")) || [];
  return allDays;
}

function listAllDays() {
  const daysContainer = document.querySelector('#all-days-container');
  const days = fetchAllDays();
  daysContainer.innerHTML = '';
  days.forEach(day => {
    const dayElement = createDayElement(day);
    daysContainer.appendChild(dayElement);
  })
}

function createDayElement(day) {
  let dayElement = document.createElement('div');
  dayElement.classList.add('day');
  const date = createDateElement(day);
  const sum = createSumElement(day);
  dayElement.appendChild(date);
  dayElement.appendChild(sum);
  return dayElement;
}

function createDateElement({ date }) {
  const myDate = createDate(date)
  let dateElement = document.createElement('span');
  dateElement.classList.add('date');
  dateElement.textContent = `${myDate}`;
  return dateElement;
}

function createSumElement({ sum }) {
  let sumElement = document.createElement('p');
  const diff = createDiffElement(sum);
  sumElement.classList.add('expense');
  sumElement.textContent = `${sum.toFixed(2)} KM`;
  sumElement.appendChild(diff);
  return sumElement;
}

function createDiffElement(sum) {
  let diffElement = document.createElement('span');
  diffElement.classList.add('diff');
  const difference = fixedAmount - sum;
  diffElement.textContent = `${difference.toFixed(2)} KM`;
  return diffElement;
}

function createOneDay () {
  const today = fetchTodayFromStorage();
  const sum = today
    .map(elem => +elem.price)
    .reduce((acc, curr) => acc + curr, 0);
  const currentDate = new Date();
  const day = {
    sum,
    timestamp: currentDate.getTime(),
    date: currentDate
  }
  return day;
}

function pushDayToArray() {
  const day = createOneDay();
  const allDays = JSON.parse(localStorage.getItem("all-days")) || [];
  allDays.push(day);
  localStorage.setItem("all-days", JSON.stringify(allDays));
}

function createDate(date) {
  const day = new Date(date).getDate();
  const month = new Date(date).getMonth();
  const year = new Date(date).getFullYear();
  const dateString = `${day} / ${+month + 1} / ${year}`;
  return dateString;
}

function resetMonthHandler() {
  localStorage.setItem("all-days", JSON.stringify([]));
  localStorage.setItem("today", JSON.stringify([]));
  listAllExpenses();
  updateAmountInHeader();
  listAllDays();
}

// MONTH AVERAGE
function calculateMonthAverage() {
  const allDays = JSON.parse(localStorage.getItem("all-days")) || [];
  const maxForDays = allDays.length * fixedAmount;
  const totalSpent = allDays
    .map(day => day.sum)
    .reduce((acc, curr) => acc + curr, 0);
  const totalsDifference = maxForDays - totalSpent;
  return totalsDifference;
}

function setMonthState() {
  const monthElement = document.querySelector('#total-month')
  const difference = calculateMonthAverage().toFixed(2);
  if(difference < 0) {
    monthElement.classList.remove('positive');
    monthElement.classList.add('negative');
  } else {
    monthElement.classList.remove('negative');
    monthElement.classList.add('positive');
  }
  monthElement.textContent = `(${difference} KM)`;
}