package br.com.ishare.core.validacao;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class ExceptionInterceptor extends ResponseEntityExceptionHandler {

    @ExceptionHandler(IShareExcessao.class)
    public final ResponseEntity<IShareExcessao> handleAllExceptions(IShareExcessao ex) {
        IShareExcessao exceptionResponse =
                new IShareExcessao(
                        ex.getMessage(), ex.getStatus());
        return new ResponseEntity(exceptionResponse, ex.getStatus());
    }
}
