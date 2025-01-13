document.addEventListener('DOMContentLoaded', function() {
    const financeForm = document.getElementById('financeForm');
    
    financeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const income = document.getElementById('monthlyIncome').value;
        const budget = document.getElementById('monthlyBudget').value;
        
        console.log('Form submitted with values:', { income, budget });
        
        localStorage.setItem('income', income);
        localStorage.setItem('budget', budget);
        
        console.log('Stored values:', {
            savedIncome: localStorage.getItem('income'),
            savedBudget: localStorage.getItem('budget')
        });
        
        window.location.href = './expenses.html';
    });
});

backToSignIn.addEventListener('click', redirectPage3)
    function redirectPage3(url) {
        location.href = './index.html'
}
