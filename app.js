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
  const shopValue = shopInput.value.trim();
  const amountValue = +amountInput.value;
  createExpenseElement(shopValue, amountValue);
  form.reset();
}

function createExpenseElement (shop, amount) {
  const expenseElement = document.createElement('div');
  expenseElement.classList.add('one-expense');
  expenseElement.appendChild(textElement);
  expenseElement.appendChild(amountElement);
  todayElement.appendChild(expenseElement);
}

function createExpanseNameElement (name) {
  let textElement = document.createElement('p'); 
  textElement.textContent = name;
  textElement.classList.add('expense-name')
  return textElement;
}

function createExpenseAmountElement(amount) {
  let amountElement = document.createElement('span');
  amountElement.textContent = `${amount} KM`;
  amountElement.classList.add('spent');
  return amountElement;
}