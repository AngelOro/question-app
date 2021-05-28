import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchQuestion } from '../actions/questionActions'

import { Question } from '../components/Question'
import { Answer } from '../components/Answer'
import { Link } from 'react-router-dom'

const SingleQuestionPage = ({
  match,
  dispatch,
  question,
  hasErrors,
  loading,
}) => {
  const { id } = match.params
  const userId = localStorage.getItem("uid");

  useEffect(() => {
    dispatch(fetchQuestion(id))
  }, [dispatch, id])

  const renderQuestion = () => {
    if (loading.question) return <p>Loading question...</p>
    if (hasErrors.question) return <p>Unable to display question.</p>

    return <Question question={question} />
  }

  const renderAnswers = () => {
    return (question.answers && question.answers.length) ? question.answers.map(answer => (
      <Answer key={answer.id} answer={answer} />
    )) : <p>Empty answer!</p>;
  }

  return (
    <section>
      {renderQuestion()}
      {userId && <Link to={"/answer/" + id} className="button right">
        Reply
      </Link>}

      <h2>Answers</h2>
      {renderAnswers()}
    </section>
  )
}

const mapStateToProps = state => ({
  question: state.question.question,
  loading: state.question.loading,
  hasErrors: state.question.hasErrors
})

export default connect(mapStateToProps)(SingleQuestionPage)