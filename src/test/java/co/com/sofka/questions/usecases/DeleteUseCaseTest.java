package co.com.sofka.questions.usecases;

import co.com.sofka.questions.model.AnswerDTO;
import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.reposioties.AnswerRepository;
import co.com.sofka.questions.reposioties.QuestionRepository;
import co.com.sofka.questions.usecases.question.DeleteUseCase;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import reactor.core.publisher.Mono;

@SpringBootTest
class DeleteUseCaseTest {

    @MockBean
    QuestionRepository questionRepository;

    @MockBean
    AnswerRepository answerRepository;

    @SpyBean
    DeleteUseCase deleteUseCase;


    @Test
    void deleteQuestionTest(){
        var questionDTO = new QuestionDTO("01","u01","test?","test","test");
        var answerDTO = new AnswerDTO("01","u01","test");
        Mockito.when(questionRepository.deleteById(questionDTO.getId())).thenReturn(Mono.empty());
        Mockito.when(answerRepository.deleteByQuestionId(answerDTO.getQuestionId())).thenReturn(Mono.empty());
        var dataEmpty = deleteUseCase.apply(questionDTO.getId()).block();
        Assertions.assertEquals(dataEmpty,null);
    }

}