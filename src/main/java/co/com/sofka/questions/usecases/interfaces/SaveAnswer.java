package co.com.sofka.questions.usecases.interfaces;

import co.com.sofka.questions.model.AnswerDTO;
import co.com.sofka.questions.model.QuestionDTO;
import reactor.core.publisher.Mono;

import javax.validation.Valid;

@FunctionalInterface
public interface SaveAnswer {
    Mono<QuestionDTO> apply(@Valid AnswerDTO answerDTO);
}