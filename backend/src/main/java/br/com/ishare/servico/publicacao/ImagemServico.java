package br.com.ishare.servico.publicacao;

import br.com.ishare.core.validacao.IShareExcessao;
import br.com.ishare.dto.publicacao.ImagemDto;
import br.com.ishare.entidade.publicacao.Imagem;
import br.com.ishare.repositorio.publicacao.ImagemJpaRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;

@Service
@Transactional
public class ImagemServico implements IImagemServico{

    @Autowired
    private ImagemJpaRepository imagemJpaRepository;

    @Override
    public Imagem cria(MultipartFile file) throws IOException {
        if(ObjectUtils.isEmpty(file)){
            throw new IShareExcessao("Erro ao salvar imagem", HttpStatus.BAD_REQUEST);
        }
        Imagem imagem = new Imagem();
        imagem.setNome(file.getOriginalFilename());
        imagem.setTipo(file.getContentType());
        imagem.setConteudo(ImagemDto.comprimeBytes(file.getBytes()));
        return imagemJpaRepository.save(imagem);
    }

}
