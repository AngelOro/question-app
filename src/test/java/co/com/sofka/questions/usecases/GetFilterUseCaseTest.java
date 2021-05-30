package co.com.sofka.questions.usecases;

import co.com.sofka.questions.collections.Question;
import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.reposioties.QuestionRepository;
import co.com.sofka.questions.usecases.question.GetFilterUseCase;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import reactor.core.publisher.Flux;


@SpringBootTest
class GetFilterUseCaseTest {

    @MockBean
    QuestionRepository questionRepository;

    @SpyBean
    GetFilterUseCase getFilterUseCase;

    @Test
    void getByQuestionTest(){
        var questionDTO = new QuestionDTO("1","66","Que fue primero","historia","existencialismo");
        var question = new Question();
        question.setId("1");
        question.setUserId("66");
        question.setQuestion("Que fue primero2");
        question.setType("historia");
        question.setCategory("existencialismo");
        Mockito.when(questionRepository.findByQuestionLike(questionDTO.getQuestion())).thenReturn(Flux.just(question));
        var resultQuestionDTO = getFilterUseCase.apply(questionDTO.getQuestion()).collectList().block();
        Assertions.assertEquals(resultQuestionDTO.get(0).getId(),question.getId());
        Assertions.assertEquals(resultQuestionDTO.get(0).getQuestion(),question.getQuestion());
        Assertions.assertEquals(resultQuestionDTO.get(0).getType(),question.getType());
    }

}