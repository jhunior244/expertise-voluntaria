package br.com.ishare.repositorio.certificado;

import br.com.ishare.entidade.usuario.Certificado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.UUID;

public interface CertificadoJpaRepository extends JpaRepository<Certificado, UUID>, CertificadoJpaRepositoryCustom, PagingAndSortingRepository<Certificado, UUID> {

}
