import { NextApiRequest, NextApiResponse } from "next";
import { GeneralEmailTemplateProps } from "types/emailTypes";
import { Resend } from "resend";
import { GeneralEmailTemplate } from "components/emails/GeneralEmailTemplate";
const resend = new Resend(process.env.RESEND_API_KEY);

// Basic API route that sends a general email
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const emailData: GeneralEmailTemplateProps = req.body;
    console.log("in email api");
    console.log(req.body);
    if (
        !emailData.to ||
        !emailData.from ||
        !emailData.subject ||
        !emailData.plainText ||
        !emailData.p1Content ||
        !emailData.previewText
    ) {
        res.status(400).json({
            error: "Missing required email data",
        });
        return;
    }

    // Send the email
    try {
        await resend.emails.send({
            to: emailData.to,
            from: emailData.from,
            subject: emailData.subject,
            text: emailData.plainText,
            react: GeneralEmailTemplate(emailData),
        });
        res.status(200).json({
            message: "Email sent",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error.message,
        });
    }
}
