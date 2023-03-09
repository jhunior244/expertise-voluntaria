package br.com.ishare.controlador;

import br.com.ishare.dto.publicacao.ImagemDto;
import br.com.ishare.mapeador.ImagemMapeador;
import br.com.ishare.servico.publicacao.IImagemServico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.annotation.RequestScope;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RequestScope
@RestController
@RequestMapping("/api/private/imagem")
public class ImagemControlador {

    @Autowired
    private IImagemServico iImagemServico;

    @Autowired
    private ImagemMapeador imagemMapeador;

    @PostMapping("/upload")
    public ImagemDto uplaodImage(@RequestParam("imagem") MultipartFile file) throws IOException {
        return imagemMapeador.paraDto(iImagemServico.cria(file));
    }
}
