import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [contestData, setContestData] = useState(null);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showWelcomePage, setShowWelcomePage] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [background, setBackground] = useState("");

  useEffect(() => {
    function fetchQuestionsFromAPI() {
      return {
        category1: {
          categoryTitle: 'وطنيات',
          questions: [
            {
              question: 'كم تبلغ مساحة دولة فلسطين التاريخية؟',
              answer1: '21000',
              answer2: '30000',
              answer3: '29029',
              answer4: '27027',
              correctAnswer: 'answer4'
            },
            {
              question: 'ما هو الاسم الذي كان يطلق على العملة الفلسطينية القديمة؟',
              answer1: 'شيكل',
              answer2: 'دينار',
              answer3: 'جنيه',
              answer4: 'ريال',
              correctAnswer: 'answer3'
            },
          ]
        },
        category2: {
          categoryTitle: 'دينيات',
          questions: [
            {
              question: 'كم عدد ركعات صلاة النصر؟',
              answer1: '2',
              answer2: '4',
              answer3: '7',
              answer4: '8',
              correctAnswer: 'answer4'
            },
            {
              question: 'كم لبث سيدنا نوح عليه السلام في قومه؟',
              answer1: '309',
              answer2: '950',
              answer3: '100',
              answer4: '1000',
              correctAnswer: 'answer2'
            },
          ]
        },
        category3: {
          categoryTitle: 'معلومات عامة',
          questions: [
            {
              question: 'ماذا يحد فلسطين من الجنوب؟',
              answer1: 'النقب',
              answer2: 'مصر',
              answer3: 'السودان',
              answer4: 'البحر الأحمر',
              correctAnswer: 'answer4'
            },
            {
              question: 'ما اسم المكون الأساسي للزجاج؟',
              answer1: 'الحديد',
              answer2: 'الرمل',
              answer3: 'الكربون',
              answer4: 'الصدف',
              correctAnswer: 'answer2'
            },
          ]
        },
      };
    }

    const apiResponse = fetchQuestionsFromAPI();
    setContestData(apiResponse);
  }, []);

  const handleNextQuestion = () => {
    if (background === '') {
      alert("الرجاء اختيار صورة قبل بدء المسابقة");
      return;
    }

    if (
      currentCategoryIndex === Object.keys(contestData).length - 1 &&
      currentQuestionIndex === contestData[`category${currentCategoryIndex + 1}`].questions.length - 1
    ) {
      alert('المسابقة انتهت!');
    } else {
      if (currentQuestionIndex === contestData[`category${currentCategoryIndex + 1}`].questions.length - 1) {
        setCurrentCategoryIndex((prev) => prev + 1);
        setCurrentQuestionIndex(0);
      } else {
        setCurrentQuestionIndex((prev) => prev + 1);
      }
    }

    setShowWelcomePage(false);
  };

  const handleImageSelect = (image) => {
    setSelectedImage(image);
    localStorage.setItem("background", image);
    document.body.style.backgroundImage = `url(${image})`;
  };

  const changeBackground = (image) => {
    // Change the background image
    setBackground(image);
  };

  const renderQuestion = () => {
    const category = contestData[`category${currentCategoryIndex + 1}`];
    const question = category.questions[currentQuestionIndex];
    return (
      <div
        className="question-container"
        style={{
          backgroundImage: `url(${background})`,
          width: '100%',
          height: '691px',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <h2 style={{ marginTop: '0px' }}>السؤال:</h2>
        <p>{question.question}</p>
        <h2>الاجابات:</h2>
        <ul>
          {Object.keys(question).map((key) => {
            if (key.includes('answer')) {
              return <li key={key}>{question[key]}</li>;
            }
            return null;
          })}
        </ul>
        <button onClick={handleNextQuestion}>Next</button>
      </div>
    );
  };

  if (!contestData) {
    return <div>Loading...</div>;
  }

  return ( <div className="App">
      {showWelcomePage ? (
        <div className="welcome-page">
          <h1>أهلا بك في مسابقة المعلومات!</h1>
          <h3>اختر صورة</h3>
          <div className="App">
            <div className="image-selection">
              <img
                src="./Design2.png"
                onClick={() => changeBackground("./Design2.png")}
              />
              <img
                src="./Design1.png"
                onClick={() => changeBackground("./Design1.png")}
              />
            </div>
          </div>
          <button onClick={handleNextQuestion}>ابدأ المسابقة</button>
        </div>
      ) : null}
      {!showWelcomePage && renderQuestion()}
    </div>
  );
}
export default App;
