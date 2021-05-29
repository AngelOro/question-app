import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select';
import AsyncSelect from 'react-select/async';

import { fetchFilterQuestion, fetchQuestionFiltered, fetchQuestions } from '../actions/questionActions'
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
             <Question key={question.id} question={question} excerpt />)             
    }

    const renderQuestions2 = () => {
        if (loading) return <p>Loading questions...</p>
        if (hasErrors) return <p>Unable to display questions.</p>
        
        return questions && questions.map(q => titleQuestion.push(q.question))
                     
    }

   
    
    console.log(titleQuestion);



    return (
        <section>
            <h1>Questions</h1>
            
            <Autocomplete suggestions={titleQuestion}    type="text" placeholder="Search " id="titleQuestion" 
              onChange={(e) => {
                if (e.target.value != null && e.target.value.trim() != ""){
                    dispatch(fetchFilterQuestion(e.target.value))
                }else{
                    dispatch(fetchQuestions())
                }
            }}/>
            
            
            {renderQuestions2(),renderQuestions()}
        </section>
    )
}


const mapStateToProps = state => ({
    loading: state.question.loading,
    questions: state.question.questions,
    hasErrors: state.question.hasErrors,
})

export default connect(mapStateToProps)(QuestionsPage)