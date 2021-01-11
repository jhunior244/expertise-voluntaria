package br.com.ishare.core.validacao;

import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Data
public class IShareExcessao extends RuntimeException {

    private String message;
    private HttpStatus status;

    public IShareExcessao (String message, HttpStatus status){
        this.message = message;
        this.status = status;
    }
}
