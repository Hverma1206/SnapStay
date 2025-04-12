import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  debug: true,
  logger: true
});

transporter.verify(function(error, success) {
  if (error) {
    console.error('SMTP server verification failed:', error);
  } else {
    console.log('SMTP server connection verified, ready to send emails');
  }
});

app.post('/api/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  console.log('Received email request:', { name, email, message: message.substring(0, 30) + '...' });
  console.log('Using credentials:', { 
    from: process.env.EMAIL_USER,
    to: process.env.RECIPIENT_EMAIL
  });

  try {
    const mailOptions = {
      from: `"Contact Form" <${process.env.EMAIL_USER}>`, 
      to: process.env.RECIPIENT_EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`, 
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
      replyTo: email,
      priority: 'high',
    };

    console.log('Attempting to send email...');
    
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email sent successfully:', info.response);
    console.log('Message ID:', info.messageId);
    
    res.status(200).json({ success: true, message: 'Email sent successfully!', messageId: info.messageId });
  } catch (error) {
    console.error('Error details:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send email', 
      error: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
