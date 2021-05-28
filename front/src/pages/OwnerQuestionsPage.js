import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchOwnerQuestions, deleteQuestion } from '../actions/questionActions'
import { Question } from '../components/Question'

const OwnerQuestionsPage = ({ dispatch, loading, questions, hasErrors, redirect }) => {
    useEffect(() => {
        const userId =  localStorage.getItem("uid");
        dispatch(fetchOwnerQuestions(userId))
    }, [dispatch]);

    useEffect(() => {
        if (redirect) {
            const userId =  localStorage.getItem("uid");
            dispatch(fetchOwnerQuestions(userId))
        }
    }, [redirect, dispatch]);

    const onDelete = (id) => {
        dispatch(deleteQuestion(id))
    }


    const renderQuestions = () => {
        if (loading) return <p>Loading questions...</p>
        if (hasErrors) return <p>Unable to display questions.</p>

        return questions.map(question => <Question
            key={question.id}
            question={question}
            excerpt onDelete={onDelete} />)
    }

    return (
        <section>
            <h1>My Questions</h1>
            {renderQuestions()}
        </section>
    )
}

const mapStateToProps = state => ({
    loading: state.question.loading,
    questions: state.question.questions,
    hasErrors: state.question.hasErrors,
    redirect: state.question.redirect,
})

export default connect(mapStateToProps)(OwnerQuestionsPage)