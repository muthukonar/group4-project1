document.addEventListener('DOMContentLoaded', function() {
    const financeForm = document.getElementById('financeForm');
    
    financeForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent form from submitting normally
        
        const income = document.getElementById('monthlyIncome').value;
        const budget = document.getElementById('monthlyBudget').value;
        
        console.log('Form submitted with values:', { income, budget }); // Debug log
        
        // Save to localStorage
        localStorage.setItem('income', income);
        localStorage.setItem('budget', budget);
        
        // Verify values were saved
        console.log('Stored values:', {
            savedIncome: localStorage.getItem('income'),
            savedBudget: localStorage.getItem('budget')
        });
        
        // Redirect to expenses page
        window.location.href = './expenses.html';
    });
});

backToSignIn.addEventListener('click', redirectPage3)
    function redirectPage3(url) {
        location.href = './index.html'
}
