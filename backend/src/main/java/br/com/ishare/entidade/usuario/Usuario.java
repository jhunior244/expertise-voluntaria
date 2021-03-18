package br.com.ishare.entidade.usuario;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.querydsl.core.annotations.QueryInit;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Entity
@Data
public class Usuario implements UserDetails {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Type(type = "uuid-char")
    private UUID id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false, unique = true)
    private String email;

    @Column
    private String token;

    @Column(nullable = false)
    @JsonIgnore
    private String senha;

    @ManyToOne
    @QueryInit("cidade.estado")
    private Endereco endereco;

    @ManyToOne
    private TipoUsuario tipoUsuario;

    @OneToMany(mappedBy = "usuario")
    private List<Avaliacao> listaAvaliacao;

    @OneToMany(mappedBy = "usuario")
    private List<Certificado> listaCertificado;

    @ManyToMany
    @JoinTable(
            name = "usuarioListaAtuacao",
            joinColumns = {
                    @JoinColumn(name = "usuario_id", nullable = false, referencedColumnName = "id")
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "area_atuacao_id", nullable = false, referencedColumnName = "id")
            }
    )
    private List<AreaAtuacao> listaAreaAtuacao;

    @ManyToMany
    @JoinTable(
            name = "usuarioListaContato",
            joinColumns = {
                    @JoinColumn(name = "usuario_id", nullable = false, referencedColumnName = "id")
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "contato_id", nullable = false, referencedColumnName = "id")
            }
    )
    private List<Usuario> listaContato;

    @ManyToMany(fetch = FetchType.EAGER)
    private List<Perfil> listaPerfil = new ArrayList<Perfil>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.listaPerfil;
    }

    @Override
    public String getPassword() {
        return this.senha;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public String getUf() {
        if(this.getEndereco() == null || this.getEndereco().getCidade() == null || this.getEndereco().getCidade().getEstado() == null){
            return null;
        }
        return this.getEndereco().getCidade().getEstado().getUf();
    }

    public String getCidade() {
        if(this.getEndereco() == null || this.getEndereco().getCidade() == null){
            return null;
        }
        return this.getEndereco().getCidade().getNome();
    }

    public String getEstado() {
        if(this.getEndereco() == null || this.getEndereco().getCidade() == null || this.getEndereco().getCidade().getEstado() == null){
            return null;
        }
        return this.getEndereco().getCidade().getEstado().getNome();
    }
}
