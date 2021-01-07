package br.com.ishare.entidade.usuario;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Data
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false, unique = true)
    private String email;

    @Column
    private String token;

    @Column(nullable = false)
    @JsonIgnore
    private String senha;

//    @ManyToMany(fetch = FetchType.EAGER)
//    private List<Perfil> listaPerfil = new ArrayList<Perfil>();
//
//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        return this.listaPerfil;
//    }

//    @Override
//    public String getPassword() {
//        return this.senha;
//    }
//
//    @Override
//    public String getUsername() {
//        return this.email;
//    }
//
//    @Override
//    public boolean isAccountNonExpired() {
//        return true;
//    }
//
//    @Override
//    public boolean isAccountNonLocked() {
//        return true;
//    }
//
//    @Override
//    public boolean isCredentialsNonExpired() {
//        return true;
//    }
//
//    @Override
//    public boolean isEnabled() {
//        return true;
//    }
}
