package br.com.ishare.mapeador;

import br.com.ishare.dto.usuario.SetorEmpresaDto;
import br.com.ishare.entidade.usuario.SetorEmpresa;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.springframework.data.domain.Page;

import java.util.List;

@Mapper(componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface SetorEmpresaMapeador {
    SetorEmpresaDto paraDto(SetorEmpresa obj);

    SetorEmpresa doDto(SetorEmpresaDto obj);

    List<SetorEmpresa> doDto(List<SetorEmpresaDto> lista);

    List<SetorEmpresaDto> paraDto(List<SetorEmpresa> lista);

    default Page<SetorEmpresaDto> paraDto(Page<SetorEmpresa> page){
        return page.map(this::paraDto);
    }
}
