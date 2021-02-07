package br.com.ishare.servico.publicacao;

import br.com.ishare.entidade.publicacao.Imagem;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface IImagemServico {
    Imagem cria(MultipartFile file) throws IOException;
}
