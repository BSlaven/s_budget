// GLOBALS

// FORM ELEMENTS
const form = document.querySelector('#form');
const shopInput = document.querySelector('#shop-input');
const amountInput = document.querySelector('#amount-input');
const todayElement = document.querySelector('#today');
const allExpenses = document.querySelector('#all-expenses');

const endDayBtn = document.querySelector('#end-day-btn');

listAllExpenses();

form.addEventListener('submit', e => {
  e.preventDefault();
  formSubmitHandler();
});

function formSubmitHandler () {
  if(!shopInput.value.trim() || +amountInput.value < 0) return;
  const shopValue = shopInput.value.trim();
  let amountValue = amountInput.value;
  if(amountValue.includes(',')) {
    amountValue = amountValue.split(',').join('.');
  }
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
    .reduce((acc, curr) => acc + curr, 0);
  header.querySelector('h4').textContent = `Danas (${total})`
}

function fetchTodayFromStorage() {
  const today = JSON.parse(localStorage.getItem("today")) || [];
  return today;
}

// ALL DAYS
endDayBtn.addEventListener('click', () => {
  const date = createDate(new Date());
  console.log('moj datum', date)
})

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
  let sumElement = document.createElement('p');
}

function createDateElement({ date }) {
  let dateElement = document.createElement('span');
  dateElement.classList.add('date');
  dateElement.textContent = ''  
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

function createDate(date) {
  const day = date.getDate();
  const month = +date.getMonth() + 1;
  const year = date.getFullYear();
  const dateString = `${day} / ${month} / ${year}`;
  return dateString;
}