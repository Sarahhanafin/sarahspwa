
let contacts = JSON.parse(localStorage.getItem("contacts")) || []; // Load contacts from LocalStorage or use an empty array

// Event listener for form submission
document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault(); 

    const firstName = document.getElementById("firstName").value;
    const surname = document.getElementById("surname").value;
    const email = document.getElementById("email").value;
    const telephone = document.getElementById("telephone").value;

    // Add the new contact as an object to the contacts array
    contacts.push({ firstName, surname, email, telephone });
    localStorage.setItem("contacts", JSON.stringify(contacts)); // Save updated contacts to LocalStorage
    generateTable(); // Update the table with the new contact

    event.target.reset(); // Clear the form fields
});

// Generate table rows from the contacts array
function generateTable() {
    const tableBody = document.getElementById("contactTableBody");
    tableBody.innerHTML = ""; // Clear previous rows

    contacts.forEach((contact, index) => {
        const newRow = document.createElement("tr");

        newRow.innerHTML = `
            <td>${contact.firstName}</td>
            <td>${contact.surname}</td>
            <td>${contact.email}</td>
            <td>${contact.telephone}</td>
            <td><button class="delete-button">Delete</button></td>
        `;

        // Delete button functionality
        const deleteButton = newRow.querySelector(".delete-button");
        deleteButton.addEventListener("click", function () {
            contacts.splice(index, 1); // Remove contact from the array
            localStorage.setItem("contacts", JSON.stringify(contacts)); // Save updated contacts to LocalStorage
            generateTable(); // Refresh the table
        });

        tableBody.appendChild(newRow);
    });
}

// Sorting functionality for column headers
document.querySelectorAll("th").forEach((header, index) => {
    header.addEventListener("click", function () {
        const columnKeys = ["firstName", "surname", "email", "telephone"];
        if (index < columnKeys.length) {
            contacts.sort((a, b) => a[columnKeys[index]].localeCompare(b[columnKeys[index]]));
            localStorage.setItem("contacts", JSON.stringify(contacts)); // Save sorted contacts to LocalStorage
            generateTable(); // Refresh the table
        }
    });
});

// Populate the table when the page loads
generateTable();

// Register the Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('./serviceWorker.js').then(function(registration) {
            console.log('ServiceWorker registered with scope:', registration.scope);
        }).catch(function(err) {
            console.log('ServiceWorker registration failed:', err);
        });
    });
}
