package br.com.ishare.servico.publicacao;

import br.com.ishare.entidade.publicacao.TipoPublicacao;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ITipoPublicacaoServico {
    List<TipoPublicacao> lista();
}
