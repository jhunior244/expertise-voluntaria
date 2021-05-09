package br.com.ishare.servico.publicacao;

import br.com.ishare.entidade.publicacao.Imagem;
import br.com.ishare.entidade.publicacao.Publicacao;
import br.com.ishare.entidade.usuario.Usuario;
import br.com.ishare.repositorio.publicacao.ImagemJpaRepository;
import br.com.ishare.repositorio.publicacao.PublicacaoJpaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import javax.transaction.Transactional;
import java.time.ZonedDateTime;
import java.util.List;
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
        publicacao.setData(ZonedDateTime.now());
        Publicacao publicacaoBanco = publicacaoJpaRepository.save(publicacao);

        if(!CollectionUtils.isEmpty(publicacao.getListaImagem())){
            for (Imagem imagem : publicacao.getListaImagem()){
                Imagem imagemBanco = imagemJpaRepository.findById(imagem.getId()).get();
                imagemBanco.setPublicacao(publicacaoBanco);
                imagemJpaRepository.save(imagemBanco);
            }
        }
        return publicacaoBanco;
    }

    @Override
    public Publicacao obtem(UUID id){
        Optional<Publicacao> optionalPublicacao = publicacaoJpaRepository.findById(id);
        return optionalPublicacao.orElse(null);
    }

    @Override
    public Page<Publicacao> lista(Usuario usuario, Pageable pagina){
        return publicacaoJpaRepository.findAll(pagina);
    }

    @Override
    public Page<Publicacao> lista(Long[] listaIdEstado, Long[] listaIdCidade, List<UUID> listaIdAreaAtuacao, Long[] listaIdTipoUsuario, Long mostrarApenasMinhasPublicacoes, UUID idUsuarioLogado, Pageable pagina){
        return publicacaoJpaRepository.lista(listaIdEstado, listaIdCidade, listaIdAreaAtuacao, listaIdTipoUsuario, mostrarApenasMinhasPublicacoes, idUsuarioLogado, pagina);
    }

    @Override
    public Page<Publicacao> listaParaSelect(UUID idUsuarioLogado, UUID idContato, Pageable pagina){
        return publicacaoJpaRepository.listaParaSelect(idUsuarioLogado, idContato, pagina);
    }
}
