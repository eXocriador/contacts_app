import nodemailer from 'nodemailer';
import { getEnvVar } from '../utils/getEnvVar';
import { EmailOptions } from '../types/models';
import createHttpError from 'http-errors';

const SMTP_HOST = getEnvVar('SMTP_HOST', 'smtp-relay.brevo.com');
const SMTP_PORT = Number(getEnvVar('SMTP_PORT', '587'));
const SMTP_USER = getEnvVar('SMTP_USER');
const SMTP_PASSWORD = getEnvVar('SMTP_PASSWORD');
const SMTP_FROM = getEnvVar('SMTP_FROM', SMTP_USER);

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: false,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD,
  },
});

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const sendEmail = async (options: EmailOptions): Promise<void> => {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const info = await transporter.sendMail({
        from: SMTP_FROM,
        to: options.to,
        subject: options.subject,
        html: options.html,
      });

      return;
    } catch (error) {
      lastError = error as Error;

      if (attempt < MAX_RETRIES) {
        await sleep(RETRY_DELAY * attempt);
        continue;
      }
    }
  }

  throw createHttpError(500, {
    message: 'Failed to send the email after multiple attempts.',
    cause: lastError
  });
};
