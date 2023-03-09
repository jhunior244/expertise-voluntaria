package br.com.ishare.controlador;

import br.com.ishare.repositorio.publicacao.PublicacaoJpaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.annotation.RequestScope;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RequestScope
@RestController
@RequestMapping("/api/private/upload")
public class UploadPrivadoControlador {

    @Autowired
    private PublicacaoJpaRepository publicacaoJpaRepository;

    private static String uploadDirectory = System.getProperty("user.home") +
            System.getProperty("file.separator") + "Documents" +
            System.getProperty("file.separator") + "Repositorio" +
            System.getProperty("file.separator") + "iShare" +
            System.getProperty("file.separator") + "uploads";

    @PostMapping("/imagemPublicacao")
    public void upload(MultipartFile[] files) throws IOException {
        StringBuilder fileNames = new StringBuilder();
        Path fileNameAndPath = null;
        for(MultipartFile file : files){
            fileNameAndPath = Paths.get(uploadDirectory , file.getOriginalFilename());
            fileNames.append(file.getOriginalFilename());
            try {
                Files.write(fileNameAndPath, file.getBytes());
                System.out.println(uploadDirectory);
            }catch (IOException e) {
                System.out.println(e.getMessage());;
            }
        }
    }

}
