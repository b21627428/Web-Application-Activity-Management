package com.example.demo;

import com.example.demo.dto.QRCodeDTO;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import java.io.*;
import java.nio.file.FileSystems;
import java.nio.file.Path;



@Component
@RequiredArgsConstructor
public class QrCodeGenerator {

    @Autowired
    private Environment env;

    public byte[] writeQRCode(QRCodeDTO qrCodeDTO) throws WriterException, IOException {

        String qrcode = env.getProperty("image_path") + qrCodeDTO.getPerson().getIdentificationNumber() +"-"+qrCodeDTO.getActivity().getActivityId()+"-QRCODE.png";

        QRCodeWriter writer = new QRCodeWriter();

        String text = qrCodeDTO.getPerson().toString()+" "+qrCodeDTO.getActivity().toString();
        BitMatrix bitMatrix = writer.encode(text, BarcodeFormat.QR_CODE,350,350);

        Path path = FileSystems.getDefault().getPath(qrcode);
        MatrixToImageWriter.writeToPath(bitMatrix,"PNG",path);

        File file = new File(qrcode);
        return readFileToByteArray(file);
    }

    private static byte[] readFileToByteArray(File file){
        FileInputStream fis = null;

        byte[] bArray = new byte[(int) file.length()];
        try{
            fis = new FileInputStream(file);
            fis.read(bArray);
            fis.close();
        }catch(IOException ioExp){
            ioExp.printStackTrace();
        }
        return bArray;
    }
}
