// ===============================
//          POPUP DIALOG LOGIC
// ===============================

// === DOM ELEMENT REFERENCES ===
// These variables store references to the DOM elements for the popup dialog and its control buttons.
const openPopup = document.querySelector(".ouvrir-dialog");     // Button to open the popup
const popupDialog = document.querySelector(".dialog");          // The actual popup dialog
const closePopup = document.querySelector(".close-dialog");     // Button to close the popup

// ===============================
//     OPEN POPUP ON BUTTON CLICK
// ===============================
// When the "openPopup" button is clicked, the popup dialog will open.
openPopup.addEventListener("click", () => {
    popupDialog.showModal(); // Open the popup dialog by calling showModal() method
});

// ===============================
//     CLOSE POPUP ON BUTTON CLICK
// ===============================
// When the "closePopup" button is clicked, the popup dialog will close.
closePopup.addEventListener("click", () => {
    popupDialog.close(); // Close the popup dialog by calling the close() method
});
