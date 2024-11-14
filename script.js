// Hämta elementen för kontaktinformation och lista
const addBtn = document.getElementById("add-btn");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const contactsDiv = document.getElementById("contacts");

// Lägg till kontakt-funktion
addBtn.addEventListener("click", () => {
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();

    if (name && phone) {
        addContact(name, phone);
        nameInput.value = '';
        phoneInput.value = '';
    }
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

    const editBtn = document.createElement("button");
    editBtn.textContent = "Ändra";
    editBtn.addEventListener("click", () => toggleEdit(contactDiv, nameField, phoneField, editBtn));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Radera";
    deleteBtn.addEventListener("click", () => contactsDiv.removeChild(contactDiv));

    contactDiv.appendChild(nameField);
    contactDiv.appendChild(phoneField);
    contactDiv.appendChild(editBtn);
    contactDiv.appendChild(deleteBtn);
    contactsDiv.appendChild(contactDiv);
}

// Funktion för att hantera redigering av en kontakt
function toggleEdit(contactDiv, nameField, phoneField, editBtn) {
    if (nameField.disabled) {
        // Om fälten är låsta, lås upp dem för redigering
        nameField.disabled = false;
        phoneField.disabled = false;
        editBtn.textContent = "Spara";
    } else {
        // Om fälten är upplåsta, spara ändringar och lås fälten
        nameField.disabled = true;
        phoneField.disabled = true;
        editBtn.textContent = "Ändra";
    }
}
