package br.com.ishare.repositorio.usuario;

import br.com.ishare.entidade.usuario.SetorEmpresa;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.UUID;

public interface SetorEmpresaJpaRepository extends JpaRepository<SetorEmpresa, UUID>, PagingAndSortingRepository<SetorEmpresa, UUID> {
    Page<SetorEmpresa> findAll(Pageable pagina);
}
