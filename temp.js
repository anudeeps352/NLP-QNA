import React, { useRef,useEffect,useState } from 'react';

import './App.css';


import * as qna from "@tensorflow-models/qna";
import  Loader from "react-loader-spinner";
import { Fragment } from 'react';
import * as tf from "@tensorflow/tfjs";
// import '@tensorflow/tfjs-core'; /* or @tensorflow/tfjs-node */
// import '@tensorflow/tfjs-backend-cpu';

const App = ()=> {

  const passageRef =useRef(null);
  const questionRef =useRef(null);
  const [answer,setAnswer] = useState(); //statehooks to store answer and model
  const [model,setModel] =useState(null); //so that we dont need to reload again.

  const loadModel=async () =>{
    const loadedModel=await qna.load()
    setModel(loadedModel);
    console.log('Model Loaded');
  }

  

  const answerQuestion = async (e)=>{ //answering question
    if(e.which===13 && model !==null) //check if enter hit and check model loaded
    {
      console.log('Question submitted.')
      const passage = passageRef.current.value //grab passage
      const question = questionRef.current.value//grab question

      const answers = await model.findAnswers(question, passage)//wait for answer
      setAnswer(answers)
      console.log(answers)
    }
  }
   useEffect(()=>{loadModel()},[])
    return (
      <div className="App">
        <header className="App-header">
          {model==null ?
           <div>
             <div>Model Loading</div>
             <Loader
              type="Puff"
              color="#00BFFF"
              height={100}
              width={100}/>
            </div>
            :
            <Fragment>
              Passage 
              <textarea ref={passageRef} rows="30" cols="100"></textarea>
              Ask A Question
              <input ref={questionRef} onKeyPress={answerQuestion}size="80"></input><input/>
              Answers
              {answer?answer.map((ans,idx)=><div><b>Answer{idx+1}-</b>{ans.text} {ans.score}</div>):""}

            </Fragment>
          }
      </header>
      </div>
    );
}

export default App;
