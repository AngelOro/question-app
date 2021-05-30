import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {  fetchQuestions } from '../actions/questionActions'
import { Question } from '../components/Question'
import Autocomplete from './Autocomplete';

const QuestionsPage = ({ dispatch, loading, questions, hasErrors }) => {
    let titleQuestion = [];
    useEffect(() => {
        dispatch(fetchQuestions())
    }, [dispatch])
    
    const renderQuestions = () => {
        if (loading) return <p>Loading questions...</p>
        if (hasErrors) return <p>Unable to display questions.</p>
        
        return questions && questions.map(question =>
             <Question dispatch={dispatch} key={question.id} question={question} excerpt />)             
    }

    const renderNameQuestions = () => {
        if (loading) return <p>Loading questions...</p>
        if (hasErrors) return <p>Unable to display questions.</p>        
        return questions && questions.map(q => titleQuestion.push(q.question))                     
    }

    return (
        <section>
            <h1>Questions</h1>            
            <Autocomplete suggestions={titleQuestion} dispatch ={dispatch} type="text" placeholder="Search " id="titleQuestion" />
            {renderNameQuestions(), renderQuestions()}
        </section>
    )
}

const mapStateToProps = state => ({
    loading: state.question.loading,
    questions: state.question.questions,
    hasErrors: state.question.hasErrors,
})

export default connect(mapStateToProps)(QuestionsPage)