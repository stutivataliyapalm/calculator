// pages/api/generate-password.js
export default function handler(req, res) {
    const { length } = req.query;  // Get the password length from the query parameters

    if (!length || length < 6 || length > 35) {
        return res.status(400).json({ error: "Password length must be between 6 and 35 characters." });
    }

    const smallchars = 'abcdefghijklmnopqrstuvwxyz';
    const bigchars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '1234567890';
    const symbols = '@#$%&*';
    const allChars = smallchars + bigchars + numbers + symbols;

    let pass = '';
    for (let i = 0; i < length; i++) {
        pass += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }

    res.status(200).json({ password: pass });
}

// Helper function to generate a random password
function generateRandomPassword(length) {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<>?';
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}