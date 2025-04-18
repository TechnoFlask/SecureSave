import "dotenv/config"
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
        user: "8aca32001@smtp-brevo.com",
        pass: process.env.BREVO_SMTP_PASSWORD,
    },
})

async function sendMail(toEmail: string, verficationCode: string) {
    const info = await transporter.sendMail({
        from: '"SecureSave" <noreply@securesave.com>',
        to: toEmail,
        subject: "SecureSave - Verify your email",
        html: `<p>Hi there,</p>
        <p>Thank you for signing up for SecureSave! To complete your registration, please verify your email address by clicking the link below:</p>
        <p><a href="https://securesave.vercel.app/verify/${verficationCode}">Verify Email</a></p>
        <p>If you did not sign up for SecureSave, please ignore this email.</p>
        <p>Best regards,</p>
        <p>The SecureSave Team</p>`,
    })
}

// async function main() {
//     const info = await transporter.sendMail({
//         from: "technoflask03@gmail.com",
//         to: "brpmona@gmail.com",
//         subject: "Hello ✔",
//         text: "Hello world?",
//         html: "<b>Hello world?</b>",
//     })

//     console.log("Message sent: %s", info.messageId)
// }

// main().catch(console.error)
