package br.com.ishare.servico.avaliacao;

import br.com.ishare.core.validacao.IShareExcessao;
import br.com.ishare.entidade.usuario.Avaliacao;
import br.com.ishare.entidade.usuario.Certificado;
import br.com.ishare.entidade.usuario.Usuario;
import br.com.ishare.repositorio.avaliacao.AvaliacaoJpaRepository;
import br.com.ishare.repositorio.certificado.CertificadoJpaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.UUID;

@Service
@Transactional
public class AvaliacaoServico implements IAvaliacaoServico {

    @Autowired
    private CertificadoJpaRepository certificadoJpaRepository;

    @Autowired
    private AvaliacaoJpaRepository avaliacaoJpaRepository;

    @Override
    public void cria(Long avaliacao, UUID idCertificado, Usuario usuarioLogado){
        Certificado certificado = certificadoJpaRepository.getOne(idCertificado);

        if (certificado.getAvaliacao() != null){
            throw new IShareExcessao("Certificado já está avaliado.", HttpStatus.BAD_REQUEST);
        }

        Avaliacao novaAvaliacao = new Avaliacao();

        if (avaliacao < 1 || avaliacao > 5){
            throw new IShareExcessao("Avaliação precisa estar entre uma e cinco estrelas.", HttpStatus.BAD_REQUEST);
        }

        novaAvaliacao.setNota(avaliacao);
        novaAvaliacao.setUsuario(certificado.getUsuario());
        novaAvaliacao.setUsuarioAvaliador(certificado.getUsuarioResponsavelCriacao());
        Avaliacao avaliacaoBanco = avaliacaoJpaRepository.save(novaAvaliacao);
        certificado.setAvaliacao(avaliacaoBanco);
        certificadoJpaRepository.save(certificado);
    }
}
