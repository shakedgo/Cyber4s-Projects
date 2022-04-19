// seeFunction adds placeholder to the input when focused.
function seeFunction() {
    const input = document.querySelector("input");
    input.placeholder = "SEE?";
}

//change the lorem ipsum to something else.
function change() {
    const elementList = document.getElementsByTagName('p');
    const element = elementList[0];
    element.innerText = "Changed - MF";
}

//change beer photo
function trashBeer() {
    const elementList = document.getElementsByTagName('img');
    const element = elementList[0];
    element.src = "https://jems.co.il/wp-content/uploads/2020/10/JEMS_29-OCT-2020_HOME-PAGE-ELEMENTS-logo2.png";
}

//changes the background color to h1
function colorChange() {
    const h1 = document.querySelector("h1");
    h1.style.backgroundColor = "Yellow"
}

//Submit button display the input value
function submit() {
    let inputVal = document.getElementById("inputId").value;
    alert(inputVal);
}