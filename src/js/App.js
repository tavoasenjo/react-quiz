import React from 'react';

// import data
import data from './data/Data';

//import components
import Question from './Question';
import Results from './Results';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allQuestions: data.allQuestions,
      currentQuestion: data.allQuestions[0],
      progress: 0,
      allAnswers: [],
      loadNewQuestion: false,
      showResults: false,
      loadingResults: false,
      correctAnswers: []
    };
  }

  // We will pass this method from the parent to the multiple levels of the children to get to NiceButton component.
  onSelectAnswer = answer => {
    // console.log('Answer selected:', answer);

    const { allAnswers } = this.state;
    this.setState(
      {
        // we will take whatever is currently in allAnswers and then we are adding the new answer to the end of the array
        allAnswers: [...allAnswers, answer]
      },
      this.goToNextQuestion() //when the state is updated, we tell react to go to the next question
    );
  };

  goToNextQuestion = () => {
    console.log('go to the next question after the state is updated');
    const { progress, allQuestions, loadNewQuestion } = this.state;
    //before we show the new question, we want to fade the original question out, for that we will need a new property on our state: loadNewQuestion
    this.setState({
      loadNewQuestion: true
    });

    // We have the question faded out and now we want it to have a little delay and update the progress state property +1, and update the currentQuestion so we can target the next question by grabbing all questions with the index of progress + 1
    setTimeout(() => {
      // lets check if the user is in the final question; if progress is less than allQuestion.lenght - 1
      if (progress < allQuestions.length - 1) {
        this.setState({
          progress: progress + 1,
          currentQuestion: allQuestions[progress + 1],
          loadNewQuestion: false
        });
      } else {
        // if the progress is not less than allQuestios.length - 1 we want to fade-out the questions and show the results
        this.setState({
          loadNewQuestion: false, //instead of fading in the question we will fade in the results
          showResults: true
        });
      }
    }, 300);
  };

  // create a method for the submit button to load results
  onLoadResults = () => {
    // console.log('loading results');
    this.setState({
      loadingResults: true
    });

    // Fetch correct answers from https://api.myjson.com/bins/zgpjb

    fetch('https://api.myjson.com/bins/zgpjb')
      .then(res => res.json())
      .then(parsedJSON => {
        console.log(parsedJSON.correctAnswers);
        const correctAnswers = parsedJSON.correctAnswers;

        this.setState({
          correctAnswers: correctAnswers,
          loadingResults: false,
          resultsLoaded: true
        });
      })
      .catch(error => {
        console.log('errors', error);
        this.setState({
          loadingResults: false,
          resultsLoaded: true
        });
      });

    // faking the load process with setTimeout
    // setTimeout(() => {
    //   this.setState({
    //     loadingResults: false
    //   });
    // }, 1000);
  };

  render() {
    // console.log('this is data from the state: ', this.state.allQuestions);
    // console.log('these are the choices: ', this.state.currentQuestion.choices);
    const { currentQuestion, loadNewQuestion, showResults, allAnswers, allQuestions, loadingResults } = this.state;
    return (
      <div className={`${loadingResults ? 'is-loading-results' : ''}`}>
        {/* Header - start */}
        <header>
          <img
            className={`${loadNewQuestion ? 'fade-out fade-out-active' : 'fade-out'}`}
            src="https://ihatetomatoes.net/react-tutorials/abc-quiz/images/plane.svg"
          />
        </header>
        {/* Header - end */}

        {/* Content - start */}
        <div className={`content`}>
          {/* Progress - start */}
          <div className="progress-container">
            <div className="progress-label">1 of 5 answered</div>
            <div className="progress">
              <div className="progress-bar" style={{ width: `20%` }}>
                <span className="sr-only">20% Complete</span>
              </div>
            </div>
          </div>
          {/* Progress - end */}

          {/* Question - start */}

          {/* wrap the question section in { } to put some JS. We set the showResults value to true & the question (which will fade-out). Only show the question when the showResults property is set to false. Otherwide, show the component Results */}
          {!showResults
            ? <Question
                currentQuestion={currentQuestion}
                onSelectAnswer={this.onSelectAnswer}
                loadNewQuestion={loadNewQuestion}
              />
            : <Results
                allQuestions={allQuestions}
                allAnswers={allAnswers}
                loadNewQuestion={loadNewQuestion}
                onLoadResults={this.onLoadResults}
              />}

          {/* Question - end */}
        </div>
        {/* Content - end */}

        {/* Navigation - start */}
        <div className={`navigation text-center is-active`}>
          <button className={`arrow`}>
            <img src="https://ihatetomatoes.net/react-tutorials/abc-quiz/fonts/navigation-left-arrow.svg" />
          </button>
          <button disabled className={`arrow is-disabled`}>
            <img src="https://ihatetomatoes.net/react-tutorials/abc-quiz/fonts/navigation-right-arrow.svg" />
          </button>
        </div>
        {/* Navigation - end */}
      </div>
    );
  }
}

export default App;
