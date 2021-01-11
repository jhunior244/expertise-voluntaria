package br.com.ishare.mapeador;

import br.com.ishare.dto.usuario.UsuarioDto;
import br.com.ishare.dto.usuario.UsuarioSaidaDto;
import br.com.ishare.entidade.usuario.Usuario;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.springframework.data.domain.Page;

import java.util.List;

@Mapper(componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UsuarioMapeador {
    UsuarioSaidaDto paraDto(Usuario obj);

    Usuario doDto(UsuarioDto obj);

    List<Usuario> doDto(List<UsuarioDto> lista);

    List<UsuarioDto> paraDto(List<Usuario> lista);

    default Page<UsuarioSaidaDto> paraDto(Page<Usuario> page){
        return page.map(this::paraDto);
    }
}
