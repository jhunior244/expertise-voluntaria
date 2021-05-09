package br.com.ishare.mapeador;

import br.com.ishare.dto.certificado.CertificadoDto;
import br.com.ishare.entidade.usuario.Certificado;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.springframework.data.domain.Page;

import java.util.List;

@Mapper(componentModel = "spring",uses =
        {ImagemMapeador.class, UsuarioMapeador.class, AvaliacaoMapeador.class, AreaAtuacaoMapeador.class},
        unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CertificadoMapeador {

    @Mapping(target = "usuario.listaContato", ignore = true)
    @Mapping(target = "usuarioResponsavelCriacao.listaContato", ignore = true)
    CertificadoDto paraDto(Certificado obj);

    Certificado doDto(CertificadoDto obj);

    List<Certificado> doDto(List<CertificadoDto> lista);

    List<CertificadoDto> paraDto(List<Certificado> lista);

    default Page<CertificadoDto> paraDto(Page<Certificado> page){
        return page.map(this::paraDto);
    }
}
