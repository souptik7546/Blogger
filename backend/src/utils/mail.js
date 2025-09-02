import mailgen from "mailgen";
import nodemailer from "nodemailer";
import ApiError from "../utils/apiError";

const sendEmail = async (options) => {
  const mailGenerator = new mailgen({
    theme: "default",
    product: {
      name: "Blogger",
      link: "https://blogger.com",
    },
  });

  const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);
  const emailHtml = mailGenerator.generate(options.mailgenContent);

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    auth: {
      host: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
  });

  const mail = {
    from: "mail.blogger@test.com",
    to: options.email,
    subject: options.subject,
    text: options.emailText,
    html: options.emailHTML,
  };

  try {
    await transporter.sendMail(mail);
  } catch (error) {
    throw new ApiError(
      403,
      "error while sending mail. Make sure you have entered the mailtrap credentials properly",
    );
  }
};

const emailVerificationMailgenContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: "welcome to Blogger,we are very excited to have you on board",
      actions: {
        instructions: "To get verified at Blogger click here",
        button: {
          color: "#22BC66",
          text: "Verify",
          link: verificationUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

const forgotPasswordMailgenContent = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,
      intro: "We have received a forgot password request for your account",
      actions: {
        instructions: "To reset your password click on the following button",
        button: {
          color: "#ae1515ff",
          text: "Reset Password",
          link: passwordResetUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

export {
  emailVerificationMailgenContent,
  forgotPasswordMailgenContent,
  sendEmail,
};
