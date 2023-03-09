package br.com.ishare.entidade.publicacao;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class TipoPublicacao {

    public enum Valores {
        OFERTA_TRABALHO(1, "Oferta de trabalho"),
        OFERTA_DEMANDA(2, "Oferta de demanda");

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
