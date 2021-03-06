package co.com.sofka.questions.usecases;

import co.com.sofka.questions.collections.Question;
import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.reposioties.QuestionRepository;
import co.com.sofka.questions.usecases.question.CreateUseCase;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import reactor.core.publisher.Mono;

import static org.mockito.Mockito.when;

@SpringBootTest
class CreateUseCaseTest {

    @SpyBean
    CreateUseCase createUseCase;

    @MockBean
    private QuestionRepository questionRepository;

    @Test
    void create(){
        var questionDTO = new QuestionDTO("1","66","Que fue primero","historia","existencialismo");
        var question=  new Question();
        question.setId("1");
        question.setUserId("66");
        question.setQuestion("Que fue primero2");
        question.setType("historia");
        question.setCategory("existencialismo");
        when(questionRepository.save(Mockito.any(Question.class))).thenReturn(Mono.just(question));
        var quest = createUseCase.apply(questionDTO);
        Assertions.assertEquals(quest.block(),"1");

    }

}