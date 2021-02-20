package br.com.ishare.entidade.publicacao;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.UUID;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

@Entity
@Data
public class Imagem {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Type(type = "uuid-char")
    private UUID id;

    private String nome;

    private String tipo;

    @Column(length = 1024000)
    private byte[] conteudo;

    @ManyToOne
    private Publicacao publicacao;

    private byte[] descomprimeBytes() {
        if(getConteudo() == null){
            return null;
        }
        Inflater inflater = new Inflater();
        inflater.setInput(getConteudo());
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(getConteudo().length);
        byte[] buffer = new byte[1024];
        try {
            while (!inflater.finished()) {
                int count = inflater.inflate(buffer);
                outputStream.write(buffer, 0, count);
            }
            outputStream.close();
        } catch (IOException ioe) {
            System.out.println(ioe.getMessage());
        } catch (DataFormatException e) {
            System.out.println(e.getMessage());
        } catch (Exception e){
            System.out.println(e.getMessage());
        }
        return outputStream.toByteArray();
    }

    public String arrayByteToBase64() throws JsonProcessingException {
        return new ObjectMapper().writeValueAsString(descomprimeBytes());
    }
}
