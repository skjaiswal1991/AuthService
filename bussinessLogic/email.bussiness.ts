
import * as nodemailer from 'nodemailer';
import * as sesTransport from 'nodemailer-ses-transport';
const path = require('path')

export class EmailService {
  sendEmail = async (
    email,
    content,
    subject,
    attachmentPath = false,
  ) => {
    try {
      const transporter = await nodemailer.createTransport(
        sesTransport({
          accessKeyId: process.env.ACCESS_KEY_ID,
          secretAccessKey: process.env.SECRET_ACCESS_KEY,
          region: process.env.SES_REGION,
        }),
      );
  
      let mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: email,
        subject: subject,
        html: content,
        attachments:[]
      };

      if (attachmentPath) {
          mailOptions.attachments = [
            {
              path: path.join(__dirname,"./.gitignore"),
            },
          ]
      }
  
      const sendEmai = await transporter.sendMail(mailOptions,(error,res)=>{
        if (error)
        console.log(sendEmai.error, 'error while sending email');
  
       return sendEmai
      });
  
      
  
      //return true;
    } catch (err) {
      console.log(err, 'sendEmailErr');
      return err;
    }
  };
}
