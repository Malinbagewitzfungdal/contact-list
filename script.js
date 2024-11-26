const addBtn = document.getElementById("add-btn");
const clearListBtn = document.getElementById("clear-list-btn");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const contactsDiv = document.getElementById("contacts");

const nameError = document.getElementById("name-error");
const phoneError = document.getElementById("phone-error");


addBtn.addEventListener("click", () => {
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();

    
    nameError.textContent = '';
    phoneError.textContent = '';

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
        addContact(name, phone);
        nameInput.value = '';
        phoneInput.value = '';
    }
});


clearListBtn.addEventListener("click", () => {
    contactsDiv.innerHTML = ''; 
});

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


function toggleEdit(nameField, phoneField, editBtn, nameError, phoneError) {
    nameError.textContent = '';
    phoneError.textContent = '';

    if (nameField.disabled) {
        nameField.disabled = false;
        phoneField.disabled = false;
        editBtn.textContent = "Spara";
    } else {
        const name = nameField.value.trim();
        const phone = phoneField.value.trim();
        let isValid = true;

        if (!name) {
            nameError.textContent = "Namnet får inte vara tomt.";
            isValid = false;
        }

        const phoneRegex = /^[0-9]+$/;
        if (!phoneRegex.test(phone)) {
            phoneError.textContent = "Telefonnummer får inte vara tomt eller innehålla annat än siffror";
            isValid = false;
        }

        if (isValid) {
            nameField.disabled = true;
            phoneField.disabled = true;
            editBtn.textContent = "Ändra";
        }
    }
}
