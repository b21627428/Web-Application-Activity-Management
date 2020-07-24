package com.example.demo;

import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import javax.activation.FileDataSource;
import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.sql.DataSource;
import java.io.FileOutputStream;
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
            String htmlText =
                    String.format("<div>Your Qr Code is below for activity.<hr/><img alt='Can not create' style='width:500px;height:500px' src='data:image/png;base64,%s'/></div>", qrCodeGenerator.create(content));
            System.out.println(htmlText);
            message.setContent(htmlText,"text/html");
            return message;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
