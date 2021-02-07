package br.com.ishare.dto.publicacao;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.UUID;
import java.util.zip.Deflater;

@Data
public class ImagemDto {

    private UUID id;

    private String nome;

    private String tipo;

    private String conteudoBase64;

    public static byte[] comprimeBytes(byte[] data) {
        if(data == null){
            return null;
        }
        Deflater deflater = new Deflater();
        deflater.setInput(data);
        deflater.finish();

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        while (!deflater.finished()) {
            int count = deflater.deflate(buffer);
            outputStream.write(buffer, 0, count);
        }
        try {
            outputStream.close();
        } catch (IOException e) {
        }

        return outputStream.toByteArray();
    }

    public byte[] base64toArrayByte() throws JsonProcessingException {
        return new ObjectMapper().writeValueAsBytes(getConteudoBase64());
    }
}
