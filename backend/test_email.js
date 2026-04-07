import nodemailer from 'nodemailer';

async function test() {
    try {
        console.log('--- Testing Nodemailer Installation ---');
        const testAccount = await nodemailer.createTestAccount();
        console.log('Account created:', testAccount.user);
        
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass,
            },
        });

        const info = await transporter.sendMail({
            from: '"Test" <test@example.com>',
            to: 'bar@example.com',
            subject: 'Hello',
            text: 'Hello world?',
        });

        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        console.log('--- TEST SUCCESSFUL ---');
    } catch (err) {
        console.error('--- TEST FAILED ---');
        console.error(err);
    }
}

test();
