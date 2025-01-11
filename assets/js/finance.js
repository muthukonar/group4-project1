const submitButton2 = document.getElementById('submitButton2');
const backToSignIn = document.getElementById('backToSignIn');

submitButton2.addEventListener('click', redirectPage2)
    function redirectPage2(url) {
        location.href = '<!---FILL WITH RESULTS PAGE ./--->!'
}

backToSignIn.addEventListener('click', redirectPage3)
    function redirectPage3(url) {
        location.href = './index.html'
}