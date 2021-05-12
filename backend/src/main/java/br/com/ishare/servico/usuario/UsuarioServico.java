package br.com.ishare.servico.usuario;

import br.com.ishare.core.validacao.IShareExcessao;
import br.com.ishare.dto.usuario.AreaAtuacaoDto;
import br.com.ishare.dto.usuario.UsuarioDto;
import br.com.ishare.entidade.usuario.*;
import br.com.ishare.mapeador.AreaAtuacaoMapeador;
import br.com.ishare.mapeador.UsuarioMapeador;
import br.com.ishare.repositorio.avaliacao.AvaliacaoJpaRepository;
import br.com.ishare.repositorio.usuario.CidadeJpaRepository;
import br.com.ishare.repositorio.usuario.EnderecoJpaRepository;
import br.com.ishare.repositorio.usuario.TipoUsuarioJpaRepository;
import br.com.ishare.repositorio.usuario.UsuarioJpaRepository;
import com.sun.istack.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;


@Service
@Transactional
public class UsuarioServico implements IUsuarioServico {

    @Autowired
    private UsuarioJpaRepository usuarioJpaRepository;

    @Autowired
    private UsuarioMapeador usuarioMapeador;

    @Autowired
    private TipoUsuarioJpaRepository tipoUsuarioJpaRepository;

    @Autowired
    private CidadeJpaRepository cidadeJpaRepository;

    @Autowired
    private EnderecoJpaRepository enderecoJpaRepository;

    @Autowired
    private AreaAtuacaoMapeador areaAtuacaoMapeador;

    @Autowired
    private AvaliacaoJpaRepository avaliacaoJpaRepository;

    @Override
    public boolean existeUsuarioCadastradoComEmail(String email){
        Usuario usuario = usuarioJpaRepository.findByEmail(email);

        return usuario != null ? true : false;
    }

    @Override
    public Usuario obtemPorToken(String token){
        return usuarioJpaRepository.findByToken(token);
    }

    @Override
    public void cria(UsuarioDto usuarioDto) throws IShareExcessao {
        if(ObjectUtils.isEmpty(usuarioDto)){
            throw new IShareExcessao("Usuário está vazio", HttpStatus.BAD_REQUEST);
        }
        Usuario usuarioBanco = usuarioJpaRepository.findByEmail(usuarioDto.getEmail());
        if (usuarioBanco != null){
            throw new IShareExcessao("Email já existe", HttpStatus.BAD_REQUEST);
        }

        Usuario usuario = new Usuario();
        usuario.setNome(usuarioDto.getNome());
        usuario.setEmail(usuarioDto.getEmail());
        if(!ObjectUtils.isEmpty(usuarioDto.getTipoUsuario())){
            Optional<TipoUsuario> tipoUsuario = tipoUsuarioJpaRepository.findById(usuarioDto.getTipoUsuario().getId());
            tipoUsuario.ifPresent(usuario::setTipoUsuario);
        }
        Endereco endereco = new Endereco();
        if(!ObjectUtils.isEmpty(usuarioDto.getEndereco())){
            endereco.setCep(usuarioDto.getEndereco().getCep());
            endereco.setRua(usuarioDto.getEndereco().getRua());
            endereco.setNumero(usuarioDto.getEndereco().getNumero());
            endereco.setBairro(usuarioDto.getEndereco().getBairro());
            if(!ObjectUtils.isEmpty(usuarioDto.getEndereco().getCidade())){
                Optional<Cidade> cidade = cidadeJpaRepository.findById(usuarioDto.getEndereco().getCidade().getId());
                cidade.ifPresent(endereco::setCidade);
            }
        }
        Endereco enderecoBanco = enderecoJpaRepository.save(endereco);

        if(!CollectionUtils.isEmpty(usuarioDto.getListaAreaAtuacao())){
            usuario.setListaAreaAtuacao(new ArrayList<>());
            for (AreaAtuacaoDto areaAtuacao : usuarioDto.getListaAreaAtuacao()){
                usuario.getListaAreaAtuacao().add(areaAtuacaoMapeador.doDto(areaAtuacao));
            }
        }
        usuario.setEndereco(enderecoBanco);
        usuario.setSenha(new BCryptPasswordEncoder().encode(usuarioDto.getSenha()));
        usuarioJpaRepository.save(usuario);
    }

    @Override
    public Page<Usuario> lista(Boolean somenteMeusContatos, boolean ignoraUsuarioLogado, String emailUsuarioLogado, Long[] listaIdEstado, Long[] listaIdCidade, List<UUID> listaIdAreaAtuacao, Long[] listaIdTipoUsuario, String nome, Pageable pagina){
        return usuarioJpaRepository.lista(somenteMeusContatos, ignoraUsuarioLogado, emailUsuarioLogado, listaIdEstado, listaIdCidade, listaIdAreaAtuacao, listaIdTipoUsuario, nome, pagina);
    }

    @Override
    public Page<UsuarioTelaContatoDto> paraUsuarioTelaConsultaDto(Page<Usuario> paginaConteudo, Usuario usuarioLogado){
        if(ObjectUtils.isEmpty(paginaConteudo) || CollectionUtils.isEmpty(paginaConteudo.getContent()) || ObjectUtils.isEmpty(usuarioLogado)){
            Pageable pagina = PageRequest.of(0, 10);
            return new PageImpl<>(new ArrayList<>(), pagina, 0);
        }

        List<UsuarioTelaContatoDto> lista = new ArrayList<>();

        for(Usuario usuario : paginaConteudo.getContent()){
            lista.add(paraUsuarioTelaConsultaDto(usuario, usuarioLogado));
        }

        Pageable pagina = PageRequest.of(paginaConteudo.getNumber(), (int)paginaConteudo.getTotalElements());

        return new PageImpl<>(lista, pagina, lista.size());
    }

    @Override
    public UsuarioTelaContatoDto paraUsuarioTelaConsultaDto(@NotNull Usuario usuario, @NotNull Usuario usuarioLogado){

        UsuarioTelaContatoDto usuarioTelaContatoDto = new UsuarioTelaContatoDto();

        usuarioTelaContatoDto.setId(usuario.getId().toString());
        usuarioTelaContatoDto.setNome(usuario.getNome());
        usuarioTelaContatoDto.setTelefone(usuario.getTelefone());
        usuarioTelaContatoDto.setEmail(usuario.getEmail());
        usuarioTelaContatoDto.setBairro(usuario.getEndereco().getBairro());
        usuarioTelaContatoDto.setCidade(usuario.getCidade());
        usuarioTelaContatoDto.setEstado(usuario.getEstado());
        usuarioTelaContatoDto.setTipoUsuarioNome(usuario.getTipoUsuario().getNome());
        usuarioTelaContatoDto.setEhContatoAdicionado(usuarioJpaRepository.usuarioEhContato(usuarioLogado.getId(), usuario.getId()));
        usuarioTelaContatoDto.setListaAreaAtuacao(areaAtuacaoMapeador.paraDto(usuario.getListaAreaAtuacao()));

        List<Avaliacao> lista = avaliacaoJpaRepository.lista(usuario.getId());
        BigDecimal nota;

        usuarioTelaContatoDto.setTotalAvaliacoes(lista.size());

        if (!CollectionUtils.isEmpty(lista)){
            nota = new BigDecimal(lista.stream().map(Avaliacao::getNota).mapToLong(Long::longValue).sum()).divide(BigDecimal.valueOf(lista.size()));
            usuarioTelaContatoDto.setMediaAvaliacao(nota);
        }

        return usuarioTelaContatoDto;
    }

    @Override
    public UsuarioTelaContatoDto adicionaContato(UsuarioTelaContatoDto usuarioTelaContatoDto, Usuario usuarioLogado){
        if(ObjectUtils.isEmpty(usuarioTelaContatoDto) || !StringUtils.hasLength(usuarioTelaContatoDto.getEmail()) || ObjectUtils.isEmpty(usuarioLogado)){
            return null;
        }
        Usuario novoContato = usuarioJpaRepository.findByEmail(usuarioTelaContatoDto.getEmail());

        if(ObjectUtils.isEmpty(novoContato)){
            return null;
        }

        if(CollectionUtils.isEmpty(usuarioLogado.getListaContato())){
            usuarioLogado.setListaContato(new ArrayList<>());
        }

        usuarioLogado.getListaContato().add(novoContato);

        usuarioLogado = usuarioJpaRepository.save(usuarioLogado);

        return paraUsuarioTelaConsultaDto(novoContato, usuarioLogado);
    }

    @Override
    public Usuario obtem(UUID id){
        Optional<Usuario> opUsuario = usuarioJpaRepository.findById(id);

        if(opUsuario.isPresent()){
            return opUsuario.get();
        }

        return null;
    }

}
