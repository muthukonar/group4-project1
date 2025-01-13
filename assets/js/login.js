document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;

    if (firstName && lastName) {
        localStorage.setItem("user", JSON.stringify({ firstName, lastName }));
        window.location.href = "finance.html";
    } else {
        alert("Please fill out all fields.");
    }
});
