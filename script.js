// Hämta elementen för kontaktinformation och lista
const addBtn = document.getElementById("add-btn");
const clearListBtn = document.getElementById("clear-list-btn");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const contactsDiv = document.getElementById("contacts");

const nameError = document.getElementById("name-error");
const phoneError = document.getElementById("phone-error");

// Lägg till kontakt-funktion
addBtn.addEventListener("click", () => {
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();

    // Återställ felmeddelanden
    nameError.textContent = '';
    phoneError.textContent = '';

    let isValid = true;

    // Kontrollera namn
    if (!name) {
        nameError.textContent = "Namnet får inte vara tomt.";
        isValid = false;
    }

    // Kontrollera telefonnummer
    const phoneRegex = /^[0-9]+$/;
    if (!phoneRegex.test(phone)) {
        phoneError.textContent = "Telefonnummer får bara innehålla siffror.";
        isValid = false;
    }

    // Om alla fält är giltiga, lägg till kontakten
    if (isValid) {
        addContact(name, phone);
        nameInput.value = '';
        phoneInput.value = '';
    }
});

// Radera hela listan-funktion
clearListBtn.addEventListener("click", () => {
    contactsDiv.innerHTML = ''; // Rensar innehållet i kontaktlistan
});

// Funktion för att skapa en kontakt och lägga till i listan
function addContact(name, phone) {
    const contactDiv = document.createElement("div");
    contactDiv.classList.add("contact");

    const nameField = document.createElement("input");
    nameField.type = "text";
    nameField.value = name;
    nameField.disabled = true;

    const phoneField = document.createElement("input");
    phoneField.type = "text";
    phoneField.value = phone;
    phoneField.disabled = true;

    const nameError = document.createElement("span");
    nameError.classList.add("error");

    const phoneError = document.createElement("span");
    phoneError.classList.add("error");

    const editBtn = document.createElement("button");
    editBtn.textContent = "Ändra";
    editBtn.classList.add("edit-btn");
    editBtn.addEventListener("click", () => toggleEdit(nameField, phoneField, editBtn, nameError, phoneError));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Radera";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => contactsDiv.removeChild(contactDiv));

    contactDiv.appendChild(nameField);
    contactDiv.appendChild(nameError);
    contactDiv.appendChild(phoneField);
    contactDiv.appendChild(phoneError);
    contactDiv.appendChild(editBtn);
    contactDiv.appendChild(deleteBtn);
    contactsDiv.appendChild(contactDiv);
}

// Funktion för att hantera redigering av en kontakt
function toggleEdit(nameField, phoneField, editBtn, nameError, phoneError) {
    // Återställ felmeddelanden
    nameError.textContent = '';
    phoneError.textContent = '';

    if (nameField.disabled) {
        // Lås upp fälten för redigering
        nameField.disabled = false;
        phoneField.disabled = false;
        editBtn.textContent = "Spara";
    } else {
        // Validera fälten innan sparning
        const name = nameField.value.trim();
        const phone = phoneField.value.trim();
        let isValid = true;

        if (!name) {
            nameError.textContent = "Namnet får inte vara tomt.";
            isValid = false;
        }

        const phoneRegex = /^[0-9]+$/;
        if (!phoneRegex.test(phone)) {
            phoneError.textContent = "Telefonnummer får bara innehålla siffror.";
            isValid = false;
        }

        if (isValid) {
            // Lås fälten igen och uppdatera knappen
            nameField.disabled = true;
            phoneField.disabled = true;
            editBtn.textContent = "Ändra";
        }
    }
}
