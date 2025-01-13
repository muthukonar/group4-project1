
function calculateTotalExpense(weeklyExpenses, monthlyExpenses) {
    return (
        weeklyExpenses.weeklyGroceries +
        weeklyExpenses.weeklyFuel +
        weeklyExpenses.weeklyEntertainment +
        monthlyExpenses.monthlyRent +
        monthlyExpenses.monthlyCellphone +
        monthlyExpenses.monthlyUtilities
    ).toFixed(2);
}

console.log(weeklyGroceries);

function saveExpensesToLocalStorage(weeklyExpenses, monthlyExpenses, totalMonthlyExpense) {
    const expenses = {
        weekly: weeklyExpenses,
        monthly: monthlyExpenses,
        totalMonthlyExpense
    };
    localStorage.setItem("expenses", JSON.stringify(expenses));
}



function handleFormSubmit(event) {
    event.preventDefault();

    // Weekly expenses
    // const weeklyGroceries = getInputValue("weeklyGroceries");
    const weeklyGroceries = parseFloat(document.getElementById("weeklyGroceries").value) || 0;
    const weeklyFuel = parseFloat(document.getElementById("weeklyFuel").value) || 0;
    const weeklyEntertainment = parseFloat(document.getElementById("weeklyEntertainment").value) || 0;


    console.log(weeklyGroceries);

   
    const monthlyRent = parseFloat(document.getElementById("monthlyRent").value) || 0;
    const monthlyCellphone = parseFloat(document.getElementById("monthlyCellphone").value) || 0;
    const monthlyUtilities = parseFloat(document.getElementById("monthlyUtilities").value) || 0;
 

 
    const weeklyExpenses = { weeklyGroceries, weeklyFuel, weeklyEntertainment };
    const monthlyExpenses = { monthlyRent, monthlyCellphone, monthlyUtilities };
  

    


    const totalMonthlyExpense = calculateTotalExpense(weeklyExpenses, monthlyExpenses);
   
    document.getElementById("totalMonthlyExpense").value = totalMonthlyExpense;
    console.log(totalMonthlyExpense);


    const financeData = JSON.parse(localStorage.getItem("finance"));
    const monthlyIncome = parseFloat(financeData?.monthlyIncome) || 0;
    const monthlyBudget = parseFloat(financeData?.monthlyBudget) || 0;

    let savingsOrLoss = (monthlyIncome - totalMonthlyExpense).toFixed(2);
    let statusMessage = "No Status";

    if (savingsOrLoss > 0) {
        statusMessage = `You have savings of $${savingsOrLoss}.`;
        
        
        document.getElementById("firecrackerAnimation").style.display = "block"; 
        document.getElementById("sadFaceAnimation").style.display = "none"; 
    } else if (savingsOrLoss < 0) {
        statusMessage = `You are in loss of $${Math.abs(savingsOrLoss)}.`;

        
        document.getElementById("sadFaceAnimation").style.display = "block"; 
        document.getElementById("firecrackerAnimation").style.display = "none"; 
    } else {
        statusMessage = "Your expenses exactly match your income.";
        document.getElementById("firecrackerAnimation").style.display = "none"; 
        document.getElementById("sadFaceAnimation").style.display = "none"; 
    }

    
    let budgetStatus = "No Budget Status";
    if (totalMonthlyExpense <= monthlyBudget) {
        budgetStatus = "You are within the budget.";
    } else {
        budgetStatus = `You exceeded the budget by $${(totalMonthlyExpense - monthlyBudget).toFixed(2)}.`;
    }

 
    document.getElementById("savingsOrLoss").innerHTML = statusMessage;
    document.getElementById("budgetStatus").innerHTML = budgetStatus;

    
    saveExpensesToLocalStorage(weeklyExpenses, monthlyExpenses, totalMonthlyExpense);
}


function handleSignOut() {
    localStorage.clear();
    window.location.href = "login.html";
}


document.getElementById("expenseForm").addEventListener("submit", handleFormSubmit);
document.getElementById("signOutBtn").addEventListener("click", handleSignOut);

