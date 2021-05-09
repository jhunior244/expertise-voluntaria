package br.com.ishare.controlador;

import br.com.ishare.core.validacao.IShareExcessao;
import br.com.ishare.dto.publicacao.PublicacaoDto;
import br.com.ishare.entidade.usuario.Usuario;
import br.com.ishare.mapeador.AvaliacaoMapeador;
import br.com.ishare.servico.avaliacao.IAvaliacaoServico;
import br.com.ishare.servico.usuario.IUsuarioServico;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.annotation.RequestScope;

import java.util.UUID;

@RequestScope
@RestController
@RequestMapping("/api/private/avaliacao")
public class AvaliacaoProtegidoControlador {

    @Autowired
    private IAvaliacaoServico avaliacaoServico;

    @Autowired
    private AvaliacaoMapeador avaliacaoMapeador;

    @Autowired
    private IUsuarioServico usuarioServico;

    @GetMapping(path = "/cria")
    public void cria(@RequestHeader(name="Authorization") String token, Long avaliacao, String idCertificado) throws JsonProcessingException {

        Usuario usuarioLogado = usuarioServico.obtemPorToken(token);
        if(ObjectUtils.isEmpty(usuarioLogado)){
            throw new IShareExcessao("Usuário não encontrado", HttpStatus.BAD_REQUEST);
        }

        if(!StringUtils.hasLength(idCertificado)){
            throw new IShareExcessao("Identificador de certificado inválido", HttpStatus.BAD_REQUEST);
        }

        avaliacaoServico.cria(avaliacao, UUID.fromString(idCertificado), usuarioLogado);
    }

}
