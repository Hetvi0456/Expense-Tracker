const expenseForm = document.getElementById("expense-form");
const expenseName = document.getElementById("expense-name");
const expenseAmount = document.getElementById("expense-amount");
const expenseCategory = document.getElementById("expense-category");
const expenseDate = document.getElementById("expense-date");

const totalAmount = document.getElementById("total-amount");
const totalTransactions = document.getElementById("total-transactions");

const expenseTableBody = document.getElementById("expense-table-body");

const searchInput = document.getElementById("search-input");
const categoryFilter = document.getElementById("category-filter");

// stores all expense objects in an array
let expenses = [];

expenseForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = expenseName.value.trim();
    const amount = parseFloat(expenseAmount.value);
    const category = expenseCategory.value;
    const date = expenseDate.value;

    if( !name ) {
        alert("Please enter a name");
        return;
    }

    if( isNaN(amount) || amount <= 0 ) {
        alert("Please enter a valid amount");
        return;
    }

    if( !category ) {
        alert("Please select a category");
        return;
    }

    if(!date || date > new Date().toISOString().split("T")[0]) {
        alert("Please enter a valid date");
        return;
    }

    console.log("Validation passed. Expense details:");
    console.log(name);
    console.log(amount);
    console.log(category);
    console.log(date);

    const expense = {
        id : Date.now(),
        name,
        amount,
        category,
        date
    };

    console.log(expense);

    addExpense(expense);
})

function addExpense(expense) {
    expenses.push(expense);
    displayExpenses();
    updateSummary();
}

function displayExpenses() {
    expenseTableBody.innerHTML = "";
    let rows = "";
    expenses.forEach((expense) => {
        rows += `
            <tr>
                <td> ${expense.name} </td>
                <td> ${expense.category} </td>
                <td> ${expense.date} </td>
                <td> $${expense.amount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} </td>
                <td> <button>Delete</button> </td>
            </tr>
        `;
    });
    expenseTableBody.innerHTML = rows;
}

// Function to update the summary of total amount and total transactions
function updateSummary() {
    let total = 0;
    expenses.forEach((expense) => {
        total += expense.amount;
    });
    totalAmount.textContent = `$${total.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    totalTransactions.textContent = expenses.length;
}