import "dotenv/config"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

type EmailParams = {
    to: string
    subject: string
    EmailBody: React.ReactNode
}

export default async function sendMail({
    to,
    subject,
    EmailBody,
}: EmailParams) {
    const res = await resend.emails.send({
        from: "SecureSave <securesave@email.technoflask.co.in>",
        to,
        subject,
        react: EmailBody,
    })

    console.log(res.data)
}
