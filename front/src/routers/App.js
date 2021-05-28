import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";


import { PublicNavbar, PrivateNavbar } from '../components/Navbar'
import HomePage from '../pages/HomePage'
import SingleQuestionPage from '../pages/SingleQuestionPage'
import QuestionsPage from '../pages/QuestionsPage'
import QuestionFilteredPage from '../pages/QuestionFilteredPage'
import QuestionFormPage from '../pages/QuestionFormPage'
import AnswerFormPage from '../pages/AnswerFormPage'
import OwnerQuestionsPage from '../pages/OwnerQuestionsPage'
import { useAuthState } from "react-firebase-hooks/auth";

firebase.initializeApp({
  apiKey: "AIzaSyCg4W4Fw4U8Qe82ki9IuaboOagOmdZUj_8",
    authDomain: "question-app-ca241.firebaseapp.com",
    projectId: "question-app-ca241",
    storageBucket: "question-app-ca241.appspot.com",
    messagingSenderId: "731006603265",
    appId: "1:731006603265:web:5347c911cd290dd3703000",
    measurementId: "G-DLS3XN4KXZ"
});

const auth = firebase.auth();


const App = () => {
  const [user] = useAuthState(auth);
  if(user?.uid){
    localStorage.setItem("uid", user?.uid);
  }
  return (
    <Router>
      {user ?
        <>
          <PrivateNavbar><SignOut/></PrivateNavbar>
          <Switch>
            <Route exact path="/" component={() => {
              return <HomePage/>
            }} />
            <Route exact path="/questions" component={QuestionsPage} />
            <Route exact path="/questionFiltered/:category" component={QuestionFilteredPage} />
            <Route exact path="/question/:id" component={SingleQuestionPage} />
            <Route exact path="/list" component={OwnerQuestionsPage} />
            <Route exact path="/answer/:id" component={AnswerFormPage} />
            <Route exact path="/new" component={QuestionFormPage} />
            <Redirect to="/" />
          </Switch>
        </> :
        <>
          <PublicNavbar><SignIn/></PublicNavbar>
          <Switch>
            <Route exact path="/" component={() => {
              return <HomePage/>
            }} />
            <Route exact path="/questions" component={QuestionsPage} />
            <Route exact path="/questionFiltered/:category" component={QuestionFilteredPage} />
            <Route exact path="/question/:id" component={SingleQuestionPage} />
            <Route exact path="/answer/:id" component={AnswerFormPage} />
            <Redirect to="/" />
          </Switch>
        </>
      }
    </Router>
  )
}


function SignIn () {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return <button className="btn btn-light" onClick={signInWithGoogle}>Sign in with google</button>;
}

function SignOut () {
  return (
    auth.currentUser && (
      <button
      className="btn btn-light"
        onClick={() => {
          localStorage.removeItem("uid");
          auth.signOut();
        }}
      >
        Sign out
      </button>
    )
  );
}


export default App