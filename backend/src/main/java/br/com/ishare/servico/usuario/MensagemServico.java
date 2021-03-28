package br.com.ishare.servico.usuario;

import br.com.ishare.core.validacao.IShareExcessao;
import br.com.ishare.entidade.usuario.Conversa;
import br.com.ishare.entidade.usuario.Mensagem;
import br.com.ishare.entidade.usuario.Usuario;
import br.com.ishare.repositorio.usuario.ConversaJpaRepository;
import br.com.ishare.repositorio.usuario.MensagemJpaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class MensagemServico implements IMensagemServico{

    @Autowired
    private MensagemJpaRepository mensagemJpaRepository;

    @Autowired
    private ConversaJpaRepository conversaJpaRepository;

    @Override
    public Page<Mensagem> lista(UUID idConversa, Pageable pageable){
        return mensagemJpaRepository.lista(idConversa, pageable);
    }

    @Override
    public Mensagem enviaMensagem(Mensagem mensagem, Usuario usuario){
        if(ObjectUtils.isEmpty(mensagem) || ObjectUtils.isEmpty(mensagem.getConversa())){
            lancaExcessaoMensagemForaEsperado();
        }
        Optional<Conversa> optConversa = conversaJpaRepository.findById(mensagem.getConversa().getId());
        if(optConversa.isEmpty()){
            lancaExcessaoMensagemForaEsperado();
        }

        Conversa conversa = optConversa.get();

        if (!conversa.getUsuarioUm().getId().equals(usuario.getId()) && !conversa.getUsuarioDois().getId().equals(usuario.getId())){
            lancaExcessaoMensagemForaEsperado();
        }

        mensagem.setUsuario(usuario);
        return mensagemJpaRepository.save(mensagem);
    }

    private void lancaExcessaoMensagemForaEsperado(){
        throw new IShareExcessao("Mensagem não atende aos requisitos exigidos para envio.", HttpStatus.BAD_REQUEST);
    }

    @Override
    public List<Mensagem> atualizaMensagem(UUID idConversa, UUID idUltimaMensagem){
        Mensagem mensagem = null;
        if (idUltimaMensagem != null){
            Optional<Mensagem> optMensagem = mensagemJpaRepository.findById(idUltimaMensagem);
            if (optMensagem.isPresent()){
                mensagem = optMensagem.get();
            }
        }
        return mensagemJpaRepository.atualizaMensagem(idConversa, mensagem);
    }
}
