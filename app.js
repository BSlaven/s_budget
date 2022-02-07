// GLOBALS
let todaysTotal = 0;
const allTodaysExpenses = [];

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
  listAllExpenses(todayElement, shopValue, amountValue);
  todaysTotal += +amountValue;
  updateAmountInHeader(todaysTotal)
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

function listAllExpenses(container, shop, amount) {
  allTodaysExpenses.forEach(elem => {
    const oneExpense = createExpenseCard(shop, amount)
    container.appendChild(oneExpense);
  })
}

function createExpenseCard (shop, amount) {
  const expenseElement = document.createElement('div');
  const nameEl = createExpanseNameElement(shop);
  const amountEl = createExpenseAmountElement(amount)
  expenseElement.classList.add('one-expense');
  expenseElement.appendChild(nameEl);
  expenseElement.appendChild(amountEl);
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

function updateAmountInHeader(amount) {
  const header = document.querySelector('#today-header');
  header.querySelector('h4').textContent = `Danas (${amount})`
}