package br.com.ishare.servico.certificado;

import br.com.ishare.dto.publicacao.ImagemDto;
import br.com.ishare.entidade.publicacao.Imagem;
import br.com.ishare.entidade.usuario.Certificado;
import br.com.ishare.entidade.usuario.Usuario;
import br.com.ishare.repositorio.certificado.CertificadoJpaRepository;
import br.com.ishare.repositorio.publicacao.ImagemJpaRepository;
import br.com.ishare.servico.publicacao.ImagemServico;
import br.com.ishare.servico.usuario.UsuarioServico;
import org.apache.commons.io.FileUtils;
import org.jodconverter.core.office.OfficeException;
import org.jodconverter.core.office.OfficeManager;
import org.jodconverter.core.office.OfficeUtils;
import org.jodconverter.local.JodConverter;
import org.jodconverter.local.office.LocalOfficeManager;
import org.scriptlet4docx.docx.DocxTemplater;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.time.ZonedDateTime;
import java.util.HashMap;
import java.util.UUID;

@Service
@Transactional
public class CertificadoServico implements ICertificadoServico {

    @Autowired
    private CertificadoJpaRepository certificadoJpaRepository;

    @Autowired
    private UsuarioServico usuarioServico;

    @Autowired
    private ImagemServico imagemServico;

    @Override
    public Certificado cria(Certificado certificado, Usuario usuarioLogado) throws IOException, OfficeException {

        Usuario usuarioVoluntario = usuarioServico.obtem(certificado.getUsuario().getId());

        certificado.setUsuarioResponsavelCriacao(usuarioLogado);
        certificado.setUsuario(usuarioVoluntario);
        certificado.setDataCriacao(ZonedDateTime.now());

        Certificado certificadoBanco =  certificadoJpaRepository.save(certificado);

        String nome = UUID.randomUUID().toString() + ".png";
        byte[] content = criaCertificado(usuarioLogado.getNome(), usuarioVoluntario.getNome(), certificado.getTempoTrabalhado(), certificadoBanco.getId().toString(), certificado.getAreaAtuacao().getNome());
        MultipartFile result = new MockMultipartFile(nome, nome, "image/png", content);

        Imagem imagemBanco = imagemServico.cria(result);
        certificadoBanco.setImagem(imagemBanco);

        return certificadoJpaRepository.save(certificado);
    }

    @Override
    public Certificado obtem(UUID id) {
        return certificadoJpaRepository.getOne(id);
    }

    @Override
    public Page<Certificado> lista(Boolean ehOngOsc, String usuarioCriador, Usuario usuarioLogado, Pageable pagina){
        return certificadoJpaRepository.lista(ehOngOsc, usuarioCriador, usuarioLogado, pagina);
    }

    private byte[] criaCertificado(String instituicao, String nomeSolidario, String numeroDias, String idCertificado, String expertise) throws IOException, OfficeException {
        String nomeTemplate = "templates/template_certificado.docx";

        InputStream certificadoInputStream = new ClassPathResource(nomeTemplate).getInputStream();

        File testeFile = new File(String.join("/", "/tmp", nomeTemplate));

        FileUtils.copyInputStreamToFile(certificadoInputStream, testeFile);

        HashMap<String, Object> params = new HashMap<>();
        params.put("nome_instituicao", instituicao);
        params.put("nome_solidario", nomeSolidario);
        params.put("numero_dias", numeroDias);
        params.put("id_certificado", idCertificado);
        params.put("expertise", expertise);
        DocxTemplater docxTemplater = new DocxTemplater(testeFile);

        String caminhoArquivo = "/tmp" + "/certificado_" + UUID.randomUUID().toString() + ".docx";

        File templatePreenchido = new File(caminhoArquivo);
        docxTemplater.process(templatePreenchido, params);

        File certificadoPng = paraPng(templatePreenchido);

        byte[] arquivoConvertido = null;
        if (certificadoPng != null){
            arquivoConvertido = Files.readAllBytes(certificadoPng.toPath());
            Files.delete(certificadoPng.toPath());
        }
        Files.delete(templatePreenchido.toPath());
        return arquivoConvertido;
    }

    private File paraPng(File testePreenchido) throws OfficeException {

        OfficeManager officeManager = null;

        try {
            officeManager = LocalOfficeManager.install();

            officeManager.start();

            File arquivoPng = new File("templates" + File.separator + UUID.randomUUID().toString() + ".png");

            JodConverter.convert(testePreenchido).to(arquivoPng).execute();

            OfficeUtils.stopQuietly(officeManager);
            System.out.println(arquivoPng.getAbsolutePath());
            return arquivoPng;
        } catch (Exception e) {

            if(officeManager != null) {
                OfficeUtils.stopQuietly(officeManager);
            }

            System.out.println(String.format("Problema ao converter o arquivo %s em png: %n %s", testePreenchido.getName(), e.getMessage()));;
        }

        return null;
    }
}
