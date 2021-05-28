package co.com.sofka.questions.usecases.question;

import co.com.sofka.questions.mapper.MapperUtils;
import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.reposioties.AnswerRepository;
import co.com.sofka.questions.reposioties.QuestionRepository;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Objects;
import java.util.function.Function;

@Service
@Validated
public class GetQuestionFilterUseCase implements Function<String, Flux<QuestionDTO>> {

    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;
    private final MapperUtils mapperUtils;


    public GetQuestionFilterUseCase(QuestionRepository questionRepository, AnswerRepository answerRepository, MapperUtils mapperUtils) {
        this.questionRepository = questionRepository;
        this.answerRepository = answerRepository;
        this.mapperUtils = mapperUtils;
    }

    @Override
    public Flux<QuestionDTO> apply(String category) {
        Objects.requireNonNull(category, "Category is required");
        return questionRepository.findByCategory(category)
                .map(mapperUtils.mapEntityToQuestion())
                .flatMap(mapQuestionAggregate());
    }

    private Function<QuestionDTO, Flux<QuestionDTO>> mapQuestionAggregate() {
        return questionDTO ->
                Flux.just(questionDTO).zipWith(
                        answerRepository.findAllByQuestionId(questionDTO.getId())
                                .map(mapperUtils.mapEntityToAnswer())
                                .collectList(),
                        (question, answers) -> {
                            question.setAnswers(answers);
                            return question;
                        }
                );
    }
}
