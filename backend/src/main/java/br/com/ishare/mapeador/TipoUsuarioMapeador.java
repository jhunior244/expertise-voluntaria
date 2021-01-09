package br.com.ishare.mapeador;

import br.com.ishare.dto.usuario.TipoUsuarioDto;
import br.com.ishare.entidade.usuario.TipoUsuario;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface TipoUsuarioMapeador {
    TipoUsuarioDto paraDto(TipoUsuario obj);

    TipoUsuario doDto(TipoUsuarioDto obj);
}
