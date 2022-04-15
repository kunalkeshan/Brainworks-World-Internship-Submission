/**
 * Application Scripts
 */

// External
import { showModal } from "./modal.js";

// DOM Elements
const layoutButton = document.getElementById("layout-btn");
const addUserSection = document.getElementById("add-section");
const searchUserSection = document.getElementById("search-section");

// Form Control
const addUserForm = document.getElementById("new-user-form");
const addUserButton = document.getElementById("new-user-btn");
const searchInput = document.getElementById("searchQuery");
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");

// Table Results Container
const resultsBody = document.getElementById("results");

let CURRENT_TAB = "add";
const SEARCH_DELAY = 800;

const checkInputState = () => {
    addUserButton.disabled = firstName.value.length > 0 && lastName.value.length > 0 ? false : true;
}

const handleFetchAllUsers = async () => {
    try {
        const response = await fetch("/api/users/all");
        const names = await response.json();
        resultsBody.innerHTML = names.data.map(name => `<tr><td>${name.firstName}</td><td>${name.lastName}</td></tr>`).join("");
    } catch (error) {
        console.log(error);
        showModal({ header: 'Unable to get all names', content: 'Please try again later.' });
    }
}; handleFetchAllUsers();

const handleLayoutChange = () => {
    if (CURRENT_TAB === 'add') {
        CURRENT_TAB = 'search';
        addUserSection.style.display = 'none';
        searchUserSection.style.display = 'block';
        layoutButton.innerText = 'Add User';
    } else {
        CURRENT_TAB = 'add';
        addUserSection.style.display = 'block';
        searchUserSection.style.display = 'none';
        layoutButton.innerText = 'Search Users';
    }
}

const handleAddUser = async (e) => {
    e.preventDefault();
    const { firstName, lastName } = e.target;
    if (firstName.value.length < 3 || lastName.value.length < 3) {
        showModal({ header: 'Invalid Input', content: 'First name or last name should be more than 3 characters' });
        firstName.focus();
        return;
    }
    try {
        const response = await fetch("/api/users/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ firstName: firstName.value, lastName: lastName.value })
        });
        const data = await response.json();
        if (!data.success) throw new Error();
        showModal({ header: 'Success', content: 'User added successfully.', type: 'success' });
        firstName.value = "";
        lastName.value = "";
        firstName.focus();
        CURRENT_TAB = 'search';
        handleLayoutChange();
        handleFetchAllUsers();

    } catch (error) {
        showModal({ header: 'Error', content: 'Unable to save User! Please try again.' });
    }
};

const handleUserSearch = async (e) => {
    try {
        const response = await fetch(`/api/users/search?query=${e.target.value}`);
        const names = await response.json();
        resultsBody.innerHTML = names.data.map(name => `<tr><td>${name.firstName}</td><td>${name.lastName}</td></tr>`).join("");
    } catch (error) {
        showModal({ header: 'Error', content: 'Unable to search, Please try again.' });
    }
};

document.addEventListener("DOMContentLoaded", () => {
    addUserButton.disabled = true;
    layoutButton.addEventListener("click", handleLayoutChange);
    addUserForm.addEventListener("submit", handleAddUser);
    searchInput.addEventListener("keyup", handleUserSearch);
    firstNameInput.addEventListener("keyup", checkInputState);
    lastNameInput.addEventListener("keyup", checkInputState);
})