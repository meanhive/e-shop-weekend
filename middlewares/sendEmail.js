const nodemailer = require('nodemailer');
const path = require('path');

let sendEmail = async (to, subject, content) => {
    try {
        await nodemailer.createTestAccount()

        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        let info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            html: `<div> ${content} </div>`
        });

        return info;
    } catch (err) {
        return err.message;
    }
}

module.exports = sendEmail