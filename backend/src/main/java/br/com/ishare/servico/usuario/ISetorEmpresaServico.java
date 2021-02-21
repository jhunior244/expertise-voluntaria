package br.com.ishare.servico.usuario;

import br.com.ishare.entidade.usuario.SetorEmpresa;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ISetorEmpresaServico {
    Page<SetorEmpresa> lista(Pageable pagina);
}
