/**
 * Application Controller
 */

// Dependencies

// Controller container
const appController = {};
const { fetchAllUsers, addUserToSheets } = require('../utils/googleapi');

// Add User to Sheet
appController.addUser = async (req, res) => {
    const { firstName, lastName } = req.body;
    try {
        await addUserToSheets({ firstName, lastName });
        return res.status(200).json({ success: true, data: { firstName, lastName } });
    } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
    }
};

// Search User in Sheet
appController.searchUser = async (req, res) => {
    const { query } = req.query;
    try {
        const allNames = await fetchAllUsers();
        if(!query) return res.status(200).json({ success: true, data: allNames });
        const filteredNames = allNames.filter(name => name.firstName.toLowerCase().includes(query.toLowerCase()) || name.lastName.toLowerCase().includes(query.toLowerCase()));
        return res.status(200).json({ success: true, data: filteredNames });
    } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
    }
};

// Get All Users from Sheet
appController.getAllUsers = async (req, res) => {
    try {
        const allNames = await fetchAllUsers();
        return res.status(200).json({ success: true, data: allNames });
    } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
    }
};

module.exports = appController;