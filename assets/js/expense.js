document.addEventListener('DOMContentLoaded', () => {
    initializeExpenseTracker();
});

function initializeExpenseTracker() {
    const elements = {
        total: document.getElementById('total'),
        backToSignIn: document.getElementById('backToSignIn'),
        inputs: document.querySelectorAll('input[type="number"]'),
        displays: {
            income: document.getElementById('incomeDisplay'),
            budget: document.getElementById('budgetDisplay'),
            total: document.getElementById('totalExp'),
            alert: document.getElementById('alert')
        }
    };

    const financialData = {
        income: Number(localStorage.getItem('income')) || 0,
        budget: Number(localStorage.getItem('budget')) || 0
    };

    if (elements.displays.income && elements.displays.budget) {
        elements.displays.income.textContent = formatCurrency(financialData.income);
        elements.displays.budget.textContent = formatCurrency(financialData.budget, 'Budget: ');
    }

    elements.inputs.forEach(input => {
        input.addEventListener('input', () => calculateTotals(elements, financialData.budget));
    });

    if (elements.backToSignIn) {
        elements.backToSignIn.addEventListener('click', () => {
            window.location.href = './index.html';
        });
    }
}

function calculateTotals(elements, budget) {
    const expenses = {
        weekly: getExpenseValues(['groceries', 'fuel', 'entertainment']),
        monthly: getExpenseValues(['rent', 'cellphone', 'utilities'])
    };

    const totalMonthlyExpenses = calculateMonthlyTotal(expenses);
    updateDisplays(elements, totalMonthlyExpenses, budget);
}

function getExpenseValues(ids) {
    return ids.reduce((acc, id) => {
        const element = document.getElementById(id);
        acc[id] = element ? Number(element.value) || 0 : 0;
        return acc;
    }, {});
}

function calculateMonthlyTotal(expenses) {
    const weeklyTotal = Object.values(expenses.weekly).reduce((sum, val) => sum + val, 0) * 4;
    const monthlyTotal = Object.values(expenses.monthly).reduce((sum, val) => sum + val, 0);
    return weeklyTotal + monthlyTotal;
}

function updateDisplays(elements, totalExpenses, budget) {
    const { total, displays } = elements;
    const formattedTotal = formatCurrency(totalExpenses);

    if (total) total.textContent = formattedTotal;
    if (displays.total) displays.total.textContent = formatCurrency(totalExpenses, 'Total Exp: ');
    
    updateBudgetAlert(displays.alert, totalExpenses, budget);
}

function updateBudgetAlert(alertElement, totalExpenses, budget) {
    if (!alertElement) return;

    const isOverBudget = totalExpenses > budget;
    const message = isOverBudget ? "You have exceeded budget!" : "You are within budget.";
    
    alertElement.textContent = message;
    alertElement.classList.toggle('text-danger', isOverBudget);
    alertElement.classList.toggle('fw-bold', isOverBudget);
}

function formatCurrency(amount, prefix = 'Income: ') {
    return `${prefix}$${amount.toFixed(2)}`;
}