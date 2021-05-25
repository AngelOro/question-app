package co.com.sofka.questions.usecases.question;

import co.com.sofka.questions.collections.Question;
import co.com.sofka.questions.mapper.MapperUtils;
import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.reposioties.QuestionRepository;
import co.com.sofka.questions.usecases.interfaces.SaveQuestion;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import reactor.core.publisher.Mono;

@Service
@Validated
public class CreateUseCase implements SaveQuestion {
    private final QuestionRepository questionRepository;
    private final MapperUtils mapperUtils;

    public CreateUseCase(MapperUtils mapperUtils, QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
        this.mapperUtils = mapperUtils;
    }

    @Override
    public Mono<String> apply(QuestionDTO newQuestion) {
        return questionRepository
                .save(mapperUtils.mapperToQuestion(null).apply(newQuestion))
                .map(Question::getId);
    }
}
