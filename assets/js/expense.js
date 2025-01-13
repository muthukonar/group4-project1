// Function to get the value from an input element
// function getInputValue(id, defaultValue = 0) {
//     const value = document.getElementById(id).value;
//     return value ? parseFloat(value) : defaultValue;
// }

// Function to calculate the total monthly expense
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

// Function to save expenses to localStorage
function saveExpensesToLocalStorage(weeklyExpenses, monthlyExpenses, totalMonthlyExpense) {
    const expenses = {
        weekly: weeklyExpenses,
        monthly: monthlyExpenses,
        totalMonthlyExpense
    };
    localStorage.setItem("expenses", JSON.stringify(expenses));
}


// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault();

    // Weekly expenses
    // const weeklyGroceries = getInputValue("weeklyGroceries");
    const weeklyGroceries = parseFloat(document.getElementById("weeklyGroceries").value) || 0;
    const weeklyFuel = parseFloat(document.getElementById("weeklyFuel").value) || 0;
    const weeklyEntertainment = parseFloat(document.getElementById("weeklyEntertainment").value) || 0;
    // const weeklyFuel = getInputValue("weeklyFuel");
    // const weeklyEntertainment = getInputValue("weeklyEntertainment");

    console.log(weeklyGroceries);

    // Monthly expenses
    // const monthlyRent = getInputValue("monthlyRent");
    const monthlyRent = parseFloat(document.getElementById("monthlyRent").value) || 0;
    const monthlyCellphone = parseFloat(document.getElementById("monthlyCellphone").value) || 0;
    const monthlyUtilities = parseFloat(document.getElementById("monthlyUtilities").value) || 0;
    // const monthlyCellphone = getInputValue("monthlyCellphone");
    // const monthlyUtilities = getInputValue("monthlyUtilities");

    // Organize expenses into objects
    const weeklyExpenses = { weeklyGroceries, weeklyFuel, weeklyEntertainment };
    const monthlyExpenses = { monthlyRent, monthlyCellphone, monthlyUtilities };
    // const monthlyExpenses = { monthlyRent,  monthlyUtilities };

    // const weeklyExpenses = { weeklyGroceries};
    // const monthlyExpenses = { monthlyRent};
    

    // Calculate total monthly expense
    const totalMonthlyExpense = calculateTotalExpense(weeklyExpenses, monthlyExpenses);
   
    // Update the total monthly expense input
    document.getElementById("totalMonthlyExpense").value = totalMonthlyExpense;
    console.log(totalMonthlyExpense);


    // Retrieve finance data (monthly income and monthly budget)
    const financeData = JSON.parse(localStorage.getItem("finance"));
    const monthlyIncome = parseFloat(financeData?.monthlyIncome) || 0;
    const monthlyBudget = parseFloat(financeData?.monthlyBudget) || 0;

    // Calculate savings or loss
    let savingsOrLoss = (monthlyIncome - totalMonthlyExpense).toFixed(2);
    let statusMessage = "No Status";

    if (savingsOrLoss > 0) {
        statusMessage = `You have savings of $${savingsOrLoss}.`;
        
        // Trigger firecracker animation when savings are positive
        document.getElementById("firecrackerAnimation").style.display = "block"; // Show firecracker effect
        document.getElementById("sadFaceAnimation").style.display = "none"; // Hide sad face if there's savings
    } else if (savingsOrLoss < 0) {
        statusMessage = `You are in loss of $${Math.abs(savingsOrLoss)}.`;

        // Trigger sad face animation when there's a loss
        document.getElementById("sadFaceAnimation").style.display = "block"; // Show sad face
        document.getElementById("firecrackerAnimation").style.display = "none"; // Hide firecracker if there's loss
    } else {
        statusMessage = "Your expenses exactly match your income.";
        document.getElementById("firecrackerAnimation").style.display = "none"; // Hide both if balanced
        document.getElementById("sadFaceAnimation").style.display = "none"; 
    }

    // Check if you are within the budget
    let budgetStatus = "No Budget Status";
    if (totalMonthlyExpense <= monthlyBudget) {
        budgetStatus = "You are within the budget.";
    } else {
        budgetStatus = `You exceeded the budget by $${(totalMonthlyExpense - monthlyBudget).toFixed(2)}.`;
    }

    // Display results
    document.getElementById("savingsOrLoss").innerHTML = statusMessage;
    document.getElementById("budgetStatus").innerHTML = budgetStatus;

    // Save to localStorage
    saveExpensesToLocalStorage(weeklyExpenses, monthlyExpenses, totalMonthlyExpense);
}

// Function to handle sign-out
function handleSignOut() {
    localStorage.clear();
    window.location.href = "login.html";
}

// Event listeners
document.getElementById("expenseForm").addEventListener("submit", handleFormSubmit);
document.getElementById("signOutBtn").addEventListener("click", handleSignOut);

