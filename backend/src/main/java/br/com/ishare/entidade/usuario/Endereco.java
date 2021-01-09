package br.com.ishare.entidade.usuario;

import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Column;
import javax.persistence.Id;

import javax.persistence.GeneratedValue;
import javax.persistence.ManyToOne;
import java.util.UUID;

@Data
public class Endereco {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private UUID id;

    @Column(nullable = false)
    private String rua;

    @Column(nullable = false)
    private String cep;

    @Column(nullable = false)
    private String numero;

    @ManyToOne
    private Cidade cidade;
}
