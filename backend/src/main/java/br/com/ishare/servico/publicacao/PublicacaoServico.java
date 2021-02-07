package br.com.ishare.servico.publicacao;

import br.com.ishare.entidade.publicacao.Imagem;
import br.com.ishare.entidade.publicacao.Publicacao;
import br.com.ishare.entidade.usuario.Usuario;
import br.com.ishare.repositorio.publicacao.ImagemJpaRepository;
import br.com.ishare.repositorio.publicacao.PublicacaoJpaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import javax.transaction.Transactional;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class PublicacaoServico implements IPublicacaoServico {

    @Autowired
    private PublicacaoJpaRepository publicacaoJpaRepository;

    @Autowired
    private ImagemJpaRepository imagemJpaRepository;

    @Override
    public Publicacao cria(Publicacao publicacao, Usuario usuario){

        publicacao.setUsuario(usuario);
        Publicacao publicacaoBanco = publicacaoJpaRepository.save(publicacao);

        if(!CollectionUtils.isEmpty(publicacao.getListaImagem())){
            for (Imagem imagem : publicacao.getListaImagem()){
                imagem.setPublicacao(publicacaoBanco);
                imagemJpaRepository.save(imagem);
            }
        }
        return publicacaoBanco;
    }

    @Override
    public Publicacao obtem(UUID id){
        Optional<Publicacao> optionalPublicacao = publicacaoJpaRepository.findById(id);
        return optionalPublicacao.orElse(null);
    }
}
