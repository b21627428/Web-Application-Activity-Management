package com.example.demo;

import com.example.demo.dto.QRCodeDTO;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;

import org.springframework.stereotype.Component;
import java.io.*;
import java.util.Base64;


@Component
public class QrCodeGenerator {


    public String writeQRCode(QRCodeDTO qrCodeDTO) throws WriterException, IOException {

        String content = qrCodeDTO.getPerson().toString()+" "+qrCodeDTO.getActivity().toString();
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(content, BarcodeFormat.QR_CODE, 500, 500);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        MatrixToImageWriter.writeToStream(bitMatrix,"png", outputStream);

        return new String(Base64.getEncoder().encode(outputStream.toByteArray()));
    }
}
