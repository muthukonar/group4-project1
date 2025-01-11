const submitButton = document.getElementById('submitButton');

submitButton.addEventListener('click', redirectPage)
    function redirectPage(url) {
        location.href = './finance.html'
}
