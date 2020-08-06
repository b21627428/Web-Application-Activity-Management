package com.example.demo;

import com.sun.istack.ByteArrayDataSource;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.core.env.Environment;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Component;
import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import java.io.*;
import java.util.HashMap;
import java.util.Properties;

@Component
@RequiredArgsConstructor
public class EmailService {

    private final QrCodeGenerator qrCodeGenerator;
    private final Environment environment;

    public void send(HashMap<String,String> map,String activityName) throws MessagingException {

        Properties properties = new Properties();
        properties.put("mail.smtp.auth","true");
        properties.put("mail.smtp.starttls.enable","true");
        properties.put("mail.smtp.host","smtp.gmail.com");
        properties.put("mail.smtp.port","587");

        String myAccountEmail = environment.getProperty("EMAILACCOUNT");
        String password = environment.getProperty("EMAILPASSWORD");
        String content = map.get("content");
        String toEmail = map.get("toEmail");

        Session session = Session.getInstance(properties,new javax.mail.Authenticator(){
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(myAccountEmail,password);
            }
        });
        Message message = prepareMessage(session,myAccountEmail,toEmail,content,activityName);
        Transport.send(message);

    }
    private Message prepareMessage(Session session,String myAccountEmail,String toEmail,String content,String activityName){
        Message message = new MimeMessage(session);
        try {
            message.setFrom(new InternetAddress(myAccountEmail));
            message.setRecipient(Message.RecipientType.TO,new InternetAddress(toEmail));
            message.setSubject("Qr Code for "+activityName);

           MimeMultipart emailContent = new MimeMultipart("related");

           MimeBodyPart textBodyPart = new MimeBodyPart();
           textBodyPart.setText("Your Qr Code is below and you need to show it when entering the activity.");
           emailContent.addBodyPart(textBodyPart);

            MimeBodyPart attachmentPart = new MimeBodyPart();
            attachmentPart.setFileName("qr code");
            attachmentPart.setDisposition(Part.ATTACHMENT);
            DataSource src = new ByteArrayDataSource(qrCodeGenerator.createImage(content).toByteArray(),"application/pdf");
            DataHandler handler = new DataHandler(src);
            attachmentPart.setDataHandler(handler);
            emailContent.addBodyPart(attachmentPart);

           message.setContent(emailContent);
//            String htmlText =
//                    String.format("<div>Your Qr Code is below for activity.<hr/><img alt='Can not create' style='width:500px;height:500px' src='data:image/png;base64,%s'/></div>", qrCodeGenerator.create(content));
//            System.out.println(htmlText);
//            System.out.println(htmlText);
//            message.setContent(htmlText,"text/html");
            return message;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
