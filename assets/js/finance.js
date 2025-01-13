document.getElementById("financeForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const monthlyIncome = document.getElementById("monthlyIncome").value;
    const monthlyBudget = document.getElementById("monthlyBudget").value;

    if (monthlyIncome && monthlyBudget) {
        localStorage.setItem("finance", JSON.stringify({ monthlyIncome, monthlyBudget }));
        window.location.href = "expenses.html";
    } else {
        alert("Please fill out all fields.");
    }
});

backToSignIn.addEventListener('click', redirectPage3)
    function redirectPage3(url) {
        location.href = './index.html'
}
