package br.com.ishare.mapeador;

import br.com.ishare.dto.publicacao.PublicacaoDto;
import br.com.ishare.dto.usuario.ConversaDto;
import br.com.ishare.entidade.usuario.Conversa;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring",uses =
        {UsuarioMapeador.class},
        unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ConversaMapeador {

    //    @Mapping(target = "contato.listaContato", ignore = true)
    @Mapping(target = "contato", expression = "java(obj.getContato(usuarioLogado))")
    @Mapping(target = "novasMensagems", expression = "java(obj.getNovasMensagens(usuarioLogado))")
    ConversaDto paraDto(Conversa obj, UUID usuarioLogado);

    Conversa doDto(ConversaDto obj);

    List<Conversa> doDto(List<ConversaDto> lista);

    default List<ConversaDto> paraDto(List<Conversa> lista, UUID usuarioLogado){
        return lista.stream()
                .filter(Objects::nonNull)
                .map(conversa -> paraDto(conversa, usuarioLogado))
                .collect(Collectors.toList());
    }

}
