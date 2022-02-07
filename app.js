// GLOBALS
let allTodaysExpenses = [];

// FORM ELEMENTS
const form = document.querySelector('#form');
const shopInput = document.querySelector('#shop-input');
const amountInput = document.querySelector('#amount-input');
const todayElement = document.querySelector('#today');

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
  const expense = createExpenseCard(shopValue, amountValue);
  todayElement.appendChild(expense);
  updateAmountInHeader();
  form.reset();
}

function pushOneExpense(shop, amount) {
  const expense = {
    id: Math.floor(Math.random() * 100000000000)
  };
  expense.name = shop;
  expense.price = amount;
  allTodaysExpenses.push(expense);
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
    allTodaysExpenses = allTodaysExpenses.filter(elem => elem.id !== id);
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
  const total = allTodaysExpenses
    .map(elem => +elem.price)
    .reduce((acc, curr) => acc + curr, 0);
  header.querySelector('h4').textContent = `Danas (${total})`
}