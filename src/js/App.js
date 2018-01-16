import React from 'react';

// import data
import data from './data/Data';

//import components
import Question from './Question';
import Results from './Results';
import Progress from './Progress';
import Arrow from './Arrow';
import defaultImage from '../images/truck.svg'

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
      correctAnswers: null
    };
  }

  // We will pass this method from the parent to the multiple levels of the children to get to NiceButton component.
  onSelectAnswer = answer => {
    // console.log('Answer selected:', answer);

    const { allAnswers, progress } = this.state;

    // Here we will write the logic that recognize if the user has selected an answer and it was selected, to allow to select another answer and deselect the previous answer selected
    const currentAnswer = allAnswers[progress];

    if (currentAnswer) {
      //if the currentAnswer exist: replace it
      allAnswers[progress] = answer;
      this.setState(
        {
          allAnswers: allAnswers
        },
        this.goToNextQuestion()
      );
    } else {
      //otherwise, add answer to the array
      this.setState(
        {
          // we will take whatever is currently in allAnswers and then we are adding the new answer to the end of the array
          allAnswers: [...allAnswers, answer]
        },
        this.goToNextQuestion() //when the state is updated, we tell react to go to the next question
      );
    }
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

  goToPreviousQuestion = () => {
    console.log('go to previous question');
    const { progress, allQuestions, loadNewQuestion, showResults } = this.state;

    this.setState({
      loadNewQuestion: true
    });

    setTimeout(() => {
      if (progress > 0 && !showResults) {
        this.setState({
          progress: progress - 1,
          loadNewQuestion: false,
          currentQuestion: allQuestions[progress - 1]
        });
      }

      // Note this is a different way to write if statements
      showResults &&
        this.setState({
          showResults: false,
          loadNewQuestion: false,
          currentQuestion: allQuestions[progress]
        });
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



    const {
      currentQuestion,
      loadNewQuestion,
      showResults,
      allAnswers,
      allQuestions,
      loadingResults,
      correctAnswers,
      resultsLoaded,
      progress
    } = this.state;

    const headerImage = !showResults ? currentQuestion.image : defaultImage;

    const navIsActive = allAnswers.length > 0;

    return (
      <div
        className={`${loadingResults ? 'is-loading-results' : ''} ${resultsLoaded
          ? 'is-showing-results'
          : 'no-results-loaded'}`}
      >
        {/* Header - start */}
        <header>
          <img
            className={`${loadNewQuestion ? 'fade-out fade-out-active' : 'fade-out'}`}
            src={headerImage}
          />
        </header>
        {/* Header - end */}

        {/* Content - start */}
        <div className={`content`}>
          {/*Here we will implement the progress bar. We will have to pass two props allQuestion.length will tell us the number of total questions and allAnswer.length will tell us the number of question the user has answered*/}
          <Progress total={allQuestions.length} progress={allAnswers.length} />
          {/* Progress - end */}

          {/* Question - start */}

          {/* wrap the question section in { } to put some JS. We set the showResults value to true & the question (which will fade-out). Only show the question when the showResults property is set to false. Otherwide, show the component Results */}
          {!showResults
            ? <Question
                currentQuestion={currentQuestion}
                onSelectAnswer={this.onSelectAnswer}
                loadNewQuestion={loadNewQuestion}
                allAnswers={allAnswers}
              />
            : <Results
                allQuestions={allQuestions}
                allAnswers={allAnswers}
                loadNewQuestion={loadNewQuestion}
                onLoadResults={this.onLoadResults}
                correctAnswers={correctAnswers}
              />}

          {/* Question - end */}
        </div>
        {/* Content - end */}

        {/* Navigation - start */}
        <div className={`navigation text-center ${navIsActive ? 'is-active' : ''}`}>
          <Arrow
            goToPreviousQuestion={this.goToPreviousQuestion}
            progress={progress}
            allAnswers={allAnswers}
            direction="left"
          />
          <Arrow
            goToNextQuestion={this.goToNextQuestion}
            progress={progress}
            allAnswers={allAnswers}
            direction="right"
            showResults={showResults}
          />
        </div>
        {/* Navigation - end */}
      </div>
    );
  }
}

export default App;
