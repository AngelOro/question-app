import React from 'react'
import { Link } from 'react-router-dom'

export const Question = ({ question, excerpt, onDelete }) => (
  <article className={excerpt ? 'question-excerpt' : 'question'}>
    <div className="card text-dark bg-light mb-3">
    <div className="card-body">
    <h2 className="card-title">{question.question}</h2>
    <Link className="card-text" to={`/questionFiltered/${question.category}`}>{question.category}</Link>
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