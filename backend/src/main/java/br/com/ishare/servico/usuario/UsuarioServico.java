package br.com.ishare.servico.usuario;

import br.com.ishare.core.validacao.IShareExcessao;
import br.com.ishare.dto.usuario.AreaAtuacaoDto;
import br.com.ishare.dto.usuario.UsuarioDto;
import br.com.ishare.entidade.usuario.*;
import br.com.ishare.mapeador.AreaAtuacaoMapeador;
import br.com.ishare.mapeador.UsuarioMapeador;
import br.com.ishare.repositorio.usuario.CidadeJpaRepository;
import br.com.ishare.repositorio.usuario.EnderecoJpaRepository;
import br.com.ishare.repositorio.usuario.TipoUsuarioJpaRepository;
import br.com.ishare.repositorio.usuario.UsuarioJpaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Optional;


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


}
