document.addEventListener('DOMContentLoaded', function() {
    const financialForm = document.querySelector('form');
    if (financialForm) {
        financialForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const income = document.getElementById('monthlyIncome').value;
            const budget = document.getElementById('monthlyBudget').value;

            console.log('Form submitted with values:', { income, budget });

            if (income && budget) {
                localStorage.setItem('income', income);
                localStorage.setItem('budget', budget);

                console.log('Stored values:', {
                    savedIncome: localStorage.getItem('income'),
                    savedBudget: localStorage.getItem('budget')
                });

                window.location.href = './expenses.html';
            }
        });
    }
});

    const expensesPage = document.getElementById('total');
    if (expensesPage) {
        const allInputs = document.querySelectorAll('input[type="number"]');

        const savedIncome = localStorage.getItem('income') || 0;
        const savedBudget = localStorage.getItem('budget') || 0;

        document.getElementById('incomeDisplay').textContent = `Income: $${savedIncome}`;
        document.getElementById('budgetDisplay').textContent = `Budget: $${savedBudget}`;

        allInputs.forEach(input => {
            input.addEventListener('input', calculateTotals);
        });

        function calculateTotals() {
            const weeklyGroceries = Number(document.getElementById('groceries').value) || 0;
            const weeklyFuel = Number(document.getElementById('fuel').value) || 0;
            const weeklyEntertainment = Number(document.getElementById('entertainment').value) || 0;

            const monthlyRent = Number(document.getElementById('rent').value) || 0;
            const monthlyCellphone = Number(document.getElementById('cellphone').value) || 0;
            const monthlyUtilities = Number(document.getElementById('utilities').value) || 0;

            const totalMonthlyExpenses = 
                (weeklyGroceries * 4) + 
                (weeklyFuel * 4) + 
                (weeklyEntertainment * 4) + 
                monthlyRent + 
                monthlyCellphone + 
                monthlyUtilities;

            document.getElementById('total').textContent = `$${totalMonthlyExpenses}`;
            document.getElementById('totalExp').textContent = `Total Exp: $${totalMonthlyExpenses}`;

            const alertElement = document.getElementById('alert');
            if (totalMonthlyExpenses > Number(savedBudget)) {
                alertElement.textContent = "You have exceeded budget!";
                alertElement.classList.add('text-danger');
                alertElement.classList.add('fw-bold');
            } else {
                alertElement.textContent = "You are within budget.";
                alertElement.classList.remove('text-danger');
                alertElement.classList.remove('fw-bold');
            }
        }
    }

    backToSignIn.addEventListener('click', redirectPage3)
    function redirectPage3(url) {
        location.href = './index.html'
};