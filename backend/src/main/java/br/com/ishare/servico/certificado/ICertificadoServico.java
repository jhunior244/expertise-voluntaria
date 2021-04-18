package br.com.ishare.servico.certificado;

import br.com.ishare.entidade.usuario.Certificado;
import br.com.ishare.entidade.usuario.Usuario;
import org.jodconverter.core.office.OfficeException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.io.IOException;
import java.util.List;

public interface ICertificadoServico {
    Page<Certificado> lista(Boolean ehOngOsc, String usuarioCriador, Usuario usuarioLogado, Pageable pagina);

    Certificado cria(Certificado certificado, Usuario usuario) throws IOException, OfficeException;
}
