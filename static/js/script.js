const form = document.querySelector("#filters");

// Constanten voor elke checkbox
const buttonSports = document.getElementById("Sports");
const buttonMusic = document.getElementById("Music");
const buttonFood = document.getElementById("Food");
const buttonDrinks = document.getElementById("Drinks");

// Constante voor h2 waarschuwing.
const h2Waarschuwing = document.querySelector("#matches h2");

// Wanneer JavaScript ondersteund is required in html weghalen zodat custom melding kan worden gemaakt.
const verwijderenRequired = () => {
    document.getElementById("Sports").removeAttribute("required");
}

// Required verwijderen meteen bij opstarten.
verwijderenRequired();

// Wanneer op submitbutton wordt geklikt hetvolgende uitvoeren.
form.addEventListener("submit", (event) => {
    // Voorkomt dat formulier wordt opgestuurd.
    event.preventDefault();

    // Er wordt gekeken of er een button is aangeklikt.
    if (buttonSports.checked == true) {
        form.submit();
    } else if (buttonMusic.checked == true) {
        form.submit();
    } else if (buttonFood.checked == true) {
        form.submit();
    } else if (buttonDrinks.checked == true) {
        form.submit();
    } else {
        console.log("Je hebt niets aangeklikt");
        h2Waarschuwing.classList.add("errorh2");
        // h2 veranderen naar volgende string
        h2Waarschuwing.innerHTML = "Je hebt nog geen intresse gekozen!";
    }
});