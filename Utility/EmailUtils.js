
const nodemailer = require('nodemailer');

module.exports = {

        async Email(Employee, Message) {

        },

        async sendMailToUser(email, body, subject) {
                try {
                        const transporter = nodemailer.createTransport({
                                // host: 'ssl0.ovh.net',
                                // port: 465,
                                // secure: true,
                                service:'gmail',
                                auth: {
                                        user: 'tanjonafanirymiaro@gmail.com',
                                        pass: 'poskrzhpbffgeect',
                                },
                        });
                        await transporter.sendMail({
                                from: 'tanjonafanirymiaro@gmail.com',
                                to: email,
                                subject,
                                text: 'Login',
                                html: body,
                        });
                } catch (err) {
                        // console.log(err);
                }
        }
};