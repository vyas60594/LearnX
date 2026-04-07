import nodemailer from 'nodemailer';

/**
 * Configure the email transport.
 * We lazily initialize the transporter to allow for dynamic test account creation if no .env exists.
 */
let transporter = null;

const getTransporter = async () => {
    if (transporter) return transporter;

    // Use ENV if provided
    if (process.env.SMTP_USER && process.env.SMTP_USER !== 'your_default_user') {
        transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
        return transporter;
    }

    // Fallback: Auto-generate Ethereal account for easy testing
    try {
        const testAccount = await nodemailer.createTestAccount();
        console.log('--- Created Automated Ethereal Account ---');
        console.log(`User: ${testAccount.user}`);
        
        transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass,
            },
        });
        return transporter;
    } catch (err) {
        console.error('--- Email Error: Failed to create Ethereal account ---');
        console.error(err.message);
        return null;
    }
};

export const sendInvitationEmail = async (email, username, tempPassword) => {
    const inviteLink = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/login`;
    const activeTransporter = await getTransporter();
    
    if (!activeTransporter) {
        console.error('--- Email Error: No active transporter available ---');
        return false;
    }

    const fromAddress = activeTransporter.options.auth?.user || 'support@learnx.com';

    const mailOptions = {
        from: `"LearnX Support" <${fromAddress}>`,
        to: email,
        subject: 'You are invited to join LearnX!',
        html: `
            <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
                <h2 style="color: #4f46e5; font-weight: 800; margin-bottom: 20px;">Welcome to LearnX!</h2>
                <p>Hello <strong>${username}</strong>,</p>
                <p>You have been invited by an administrator to join our learning platform.</p>
                
                <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <p style="margin: 0; font-size: 14px; color: #64748b;">Your temporary login credentials are:</p>
                    <p style="margin: 5px 0 0; font-weight: bold; color: #1e293b;">Email: ${email}</p>
                    <p style="margin: 5px 0 0; font-weight: bold; color: #1e293b;">Password: ${tempPassword}</p>
                </div>

                <a href="${inviteLink}" style="display: inline-block; background-color: #4f46e5; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 10px;">Login Now</a>
                
                <p style="margin-top: 30px; font-size: 12px; color: #94a3b8;">
                    For your security, we recommend changing your password after your first login.
                </p>
                <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 20px 0;" />
                <p style="font-size: 11px; color: #cbd5e1;">&copy; 2026 LearnX Platform. All rights reserved.</p>
            </div>
        `,
    };

    try {
        const info = await activeTransporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        
        // If it's a test account, log the URL to preview the email
        const testUrl = nodemailer.getTestMessageUrl(info);
        if (testUrl) {
            console.log('--- Invitation Email Preview URL ---');
            console.log(testUrl);
            console.log('-------------------------------------');
        }
        return true;
    } catch (error) {
        console.error('Email send error:', error);
        return false;
    }
};
