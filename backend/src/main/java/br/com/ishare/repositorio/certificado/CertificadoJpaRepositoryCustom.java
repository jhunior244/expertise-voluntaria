package br.com.ishare.repositorio.certificado;

import br.com.ishare.entidade.usuario.Certificado;
import br.com.ishare.entidade.usuario.Usuario;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CertificadoJpaRepositoryCustom {
    Page<Certificado> lista(Boolean ehOngOsc, String usuarioCriador, Usuario usuarioLogado, Pageable pagina);
}
