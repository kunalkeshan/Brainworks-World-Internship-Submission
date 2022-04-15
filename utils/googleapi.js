/**
 * Google Sheets API integration
 */

const { google } = require('googleapis');
const SPREADSHEET_ID = "1T44FMKLS_nwWpUZh8QGgA7PPsKy5IKl4UTWtc_-j22A";

const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
});

const addUserToSheets = async ({ firstName, lastName }) => {
    try {
        const client = await auth.getClient();
        const googleSheets = google.sheets({ version: "v4", auth: client });
        await googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId: SPREADSHEET_ID,
            range: "Names!A:B",
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [
                    [firstName, lastName],
                ]
            }
        });
    } catch (error) {
        return Promise.reject(error);
    }
}

const fetchAllUsers = async () => {
    try {
        const client = await auth.getClient();
        const googleSheets = google.sheets({ version: "v4", auth: client });
        const rows = await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId: SPREADSHEET_ID,
            range: "Names!A:B",
        });
        const values = rows.data.values.map((value) => {
            return {
                firstName: value[0],
                lastName: value[1]
            }
        });
        return values;
    } catch (error) {
        return Promise.reject(error);
    }
}

fetchAllUsers();
// addUserToSheets({ firstName: "Kunal", lastName: "Keshan" });

module.exports = {
    fetchAllUsers,
    addUserToSheets,
}

