package br.com.ishare.controlador;

import br.com.ishare.core.validacao.IShareExcessao;
import br.com.ishare.dto.usuario.UsuarioDto;
import br.com.ishare.entidade.usuario.Usuario;
import br.com.ishare.entidade.usuario.UsuarioTelaContatoDto;
import br.com.ishare.mapeador.UsuarioMapeador;
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
import org.springframework.http.HttpStatus;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.annotation.RequestScope;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;

@RequestScope
@RestController
@RequestMapping("/api/public/usuario")
public class UsuarioPublicoControlador {

    @Autowired
    private UsuarioServico usuarioServico;

    @Autowired
    private UsuarioMapeador usuarioMapeador;

    @GetMapping(path = "existeUsuarioCadastradoComEmail")
    public boolean existeUsuarioCadastradoComEmail(String email){
        return usuarioServico.existeUsuarioCadastradoComEmail(email);
    }

    @PostMapping(path = "/cria")
    public void cria(@RequestBody UsuarioDto usuarioDto) throws Exception {
        usuarioServico.cria(usuarioDto);
    }

}
