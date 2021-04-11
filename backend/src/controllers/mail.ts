import nodemailer from "nodemailer";
import config from "../config";
import User from "../database/models/user";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.mail.user,
    pass: config.mail.pass,
  },
});

async function sendCode(user: User, code: string) {
  await transporter.sendMail({
    from: config.mail.user,
    to: user.email,
    subject: "LinkedFate confirmation code",
    text: `Your confirmation code is: ${code}`,
  });
}

async function sendWorkRequest(from: User, to: User) {
  await transporter.sendMail({
    from: config.mail.user,
    to: to.email,
    subject: `${from.names} ${from.surnames} is requesting a job`,
    text: `${from.names} ${from.surnames} is requesting a job. Contact to him number ${from.phone} or email ${from.email}`,
  });
}

async function sendJobRequest(from: User, to: User) {
  await transporter.sendMail({
    from: config.mail.user,
    to: to.email,
    subject: `${from.names} is requesting an employee`,
    text: `${from.names} is requesting an employee. Contact to business number ${from.phone} or email ${from.email}`,
  });
}

export { sendCode, sendWorkRequest, sendJobRequest };
export default { sendCode, sendWorkRequest, sendJobRequest };
