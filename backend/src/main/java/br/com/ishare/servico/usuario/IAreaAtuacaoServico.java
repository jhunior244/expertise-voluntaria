package br.com.ishare.servico.usuario;

import br.com.ishare.entidade.usuario.AreaAtuacao;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IAreaAtuacaoServico {
    Page<AreaAtuacao> lista(Pageable pagina);
}
