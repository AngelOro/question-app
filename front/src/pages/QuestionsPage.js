import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchFilterQuestion, fetchQuestions } from '../actions/questionActions'
import { Question } from '../components/Question'

const QuestionsPage = ({ dispatch, loading, questions, hasErrors }) => {
    useEffect(() => {
        dispatch(fetchQuestions())
    }, [dispatch])
    
    const renderQuestions = () => {
        if (loading) return <p>Loading questions...</p>
        if (hasErrors) return <p>Unable to display questions.</p>

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

export default connect(mapStateToProps)(QuestionsPage)