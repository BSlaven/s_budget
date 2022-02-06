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
  let textElement = document.createElement('p');
  let amountElement = document.createElement('span');
  textElement.textContent = shop;
  textElement.classList.add('expense-name')
  amountElement.textContent = `${amount} KM`;
  amountElement.classList.add('spent');
  expenseElement.classList.add('one-expense');
  expenseElement.appendChild(textElement);
  expenseElement.appendChild(amountElement);
  todayElement.appendChild(expenseElement);
}