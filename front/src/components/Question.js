import React from 'react'
import { Link } from 'react-router-dom'
import { fetchQuestionFiltered } from '../actions/questionActions'

export const Question = ({ question, excerpt, onDelete, dispatch }) => (
  <article className={excerpt ? 'question-excerpt' : 'question'}>
    <div className="card text-dark bg-light mb-3">
      <div className="card-body">
        <h2 className="card-title">{question.question}</h2>
        <p className="card-text" onClick={() => {
          if (dispatch !== undefined) dispatch(fetchQuestionFiltered(question.category))
        }}>{question.category}</p>
        <p> Tipo: <small>{question.type}</small></p>
        {onDelete && (
          <button className="button right" onClick={() => onDelete(question.id)}>DELETE</button>
        )}
        {excerpt && (
          <Link to={`/question/${question.id}`} className="button">
            View Question
          </Link>
        )}
      </div>
    </div>
  </article>
)