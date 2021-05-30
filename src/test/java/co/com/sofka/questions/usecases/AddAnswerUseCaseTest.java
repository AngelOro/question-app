package co.com.sofka.questions.usecases;

import co.com.sofka.questions.collections.Answer;
import co.com.sofka.questions.model.AnswerDTO;
import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.reposioties.AnswerRepository;
import co.com.sofka.questions.usecases.answer.AddAnswerUseCase;
import co.com.sofka.questions.usecases.question.GetQuestionUseCase;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import reactor.core.publisher.Mono;


@SpringBootTest
class AddAnswerUseCaseTest {

    @SpyBean
    AddAnswerUseCase addAnswerUseCase;

    @MockBean
    GetQuestionUseCase getUseCase;

    @MockBean
    AnswerRepository answerRepository;

    @Test
    void answerTest(){
        var questionDTO = new QuestionDTO("1","66","Que fue primero","historia","existencialismo");
        var answerDTO = new AnswerDTO("1","1036","la gallina");
        var answer = new Answer();
        answer.setId("a1");
        answer.setQuestionId("1");
        answer.setUserId("1036");
        answer.setAnswer("la gallina");
        Mockito.when(answerRepository.save(Mockito.any(Answer.class))).thenReturn(Mono.just(answer));
        Mockito.when(getUseCase.apply(Mockito.anyString())).thenReturn(Mono.just(questionDTO));
        var resultQuestionDTO = addAnswerUseCase.apply(answerDTO).block();
        Assertions.assertEquals(resultQuestionDTO.getId(),questionDTO.getId());
        Assertions.assertEquals(resultQuestionDTO.getQuestion(),questionDTO.getQuestion());
        Assertions.assertEquals(resultQuestionDTO.getAnswers().get(0).getQuestionId(),answerDTO.getQuestionId());

    }

}