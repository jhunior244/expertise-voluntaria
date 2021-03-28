package br.com.ishare.servico.usuario;

import br.com.ishare.dto.usuario.ConversaDto;
import br.com.ishare.entidade.usuario.Conversa;
import br.com.ishare.entidade.usuario.Usuario;
import br.com.ishare.mapeador.ConversaMapeador;
import br.com.ishare.repositorio.usuario.ConversaJpaRepository;
import br.com.ishare.repositorio.usuario.UsuarioJpaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class ConversaServico implements IConversaServico {

    @Autowired
    private ConversaJpaRepository conversaJpaRepository;

    @Autowired
    private ConversaMapeador conversaMapeador;

    @Autowired
    private UsuarioJpaRepository usuarioJpaRepository;

    @Override
    public Page<ConversaDto> listaParaChat(UUID usuarioLogado, Pageable pagina){
        Page<Conversa> page = conversaJpaRepository.listaParaChat(usuarioLogado, pagina);
        List<ConversaDto> lista = new ArrayList<>();
        if(page == null || CollectionUtils.isEmpty(page.getContent())){
            return new PageImpl<>(lista, pagina, 0);
        }

        return new PageImpl<>(conversaMapeador.paraDto(page.getContent(), usuarioLogado), pagina, lista.size());
    }

    @Override
    public Conversa cria(ConversaDto conversaDto, Usuario usuarioLogado){
        Conversa conversaBanco = conversaJpaRepository.findByUsuarioUmId(conversaDto.getContato().getId());
        if(!ObjectUtils.isEmpty(conversaBanco)){
            return conversaBanco;
        }

        conversaBanco = conversaJpaRepository.findByUsuarioDoisId(conversaDto.getContato().getId());

        if(!ObjectUtils.isEmpty(conversaBanco)){
            return conversaBanco;
        }
        Usuario usuarioDois = usuarioJpaRepository.findByEmail(conversaDto.getContato().getEmail());

        Conversa conversa = new Conversa();
        conversa.setUsuarioUm(usuarioLogado);
        conversa.setUsuarioDois(usuarioDois);
        conversa.setDataCriacao(ZonedDateTime.now());
        conversa.setDataUltimaModificacao(ZonedDateTime.now());
        return conversaJpaRepository.save(conversa);
    }
}
