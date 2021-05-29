import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchQuestionFiltered, fetchFilterQuestion, fetchQuestions } from '../actions/questionActions'
import { Question } from '../components/Question'


const QuestionsFilteredPage = ({ dispatch, loading, questions, hasErrors,match }) => {
    const {category} = match.params
    useEffect(() => {
        dispatch(fetchQuestionFiltered(category))
    }, [dispatch, category])
    
    const renderQuestions = () => {
       if (loading.question) return <p>Loading question...</p>
        if (hasErrors.question) return <p>Unable to display question.</p>
        
        return questions && questions.map(question => <Question key={question.id} question={question} excerpt />)
    }

    return (
        <section>
            <h1>Questions</h1>
            <input type="text" placeholder="Search " onChange={(e) => {
                if (e.target.value != null && e.target.value.trim() != ""){
                    dispatch(fetchFilterQuestion(e.target.value))
                }else{
                    dispatch(fetchQuestions())
                }
            }} />
            {renderQuestions()}
        </section>
    )
}

const mapStateToProps = state => ({
    loading: state.question.loading,
    questions: state.question.questions,
    hasErrors: state.question.hasErrors,
})

export default connect(mapStateToProps)(QuestionsFilteredPage)