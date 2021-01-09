package br.com.ishare.entidade.usuario;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class TipoUsuario {
    public enum Valores {
        PESSOA_FISICA(1, "Pessoa física"),
        PESSOA_JURIDICA(2, "Pessoa jurídica");

        private long id;
        private String nome;

        Valores(int id, String nome) {
            this.nome = nome;
            this.id = id;
        }

        public long obtemId() {
            return this.id;
        }
    }


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String nome;
}
