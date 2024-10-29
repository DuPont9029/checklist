"use client"
import React, { useState } from "react";

const Form: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});
  const [checkedAnswers, setCheckedAnswers] = useState<{ [key: string]: boolean }>({});
  const [error, setError] = useState<string | null>(null);

  const questions = [
    {
        id: "q1",
        question: "Quale era il servizio di intelligence in germania dell'est?",
        options: ["Gestapo", "BND", "Stasi", "CIA"],
        correctAnswer: "Stasi"
    },
    {
        id: "q2",
        question: "Qual è l'acronimo usato per definire un missile balistico intercontinentale semplice?",
        options: ["M.A.R.V", "M.I.R.V", "I.C.B.M", "S.L.B.M"],
        correctAnswer: "I.C.B.M"
    },
    {
        id: "q3",
        question: "Come si chiama l'attuale servizio di intelligence interno in italia",
        options: ["AISE", "SISMI", "SISDE", "AISI"],
        correctAnswer: "AISI"
    },
    {
        id: "q4",
        question: "Quale è l'attuale dottrina NATO per la guerra nucleare?",
        options: ["First Strike", "No First Use", "Mutual Assured Destruction", "Flexible Response"],
        correctAnswer: "Mutual Assured Destruction"
    },
    {
        id: "q5",
        question: "La maggior parte delle armi chimiche prima di essere scoperte venivano usate come?",
        options: ["Ratticidi", "Insetticidi", "Disserbanti", "Antidolorifici"],
        correctAnswer: "Insetticidi"
    },
    {
        id: "q6",
        question: "Quale è il nome del servizio di intelligence interna giapponese?",
        options: ["PSIA", "FSB", "CIRO", "NIS"],
        correctAnswer: "PSIA"
    },
    {
        id: "q7",
        question: "Quale è il servizio di intelligence più temuto dalla C.I.A?",
        options: ["Mossad (Israeliano)", "MI6 (Britannico)", "FSB (Russo)", "KGB (Sovietico)", "DGSE (Francese)"],
        correctAnswer: "DGSE (Francese)"
    }
  ];

  const handleOptionChange = (questionId: string, selectedOption: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: selectedOption
    }));
  };

  const checkAnswers = () => {
    const results: { [key: string]: boolean } = {};
    let allAnswered = true;
    let correctCount = 0;

    questions.forEach(({ id, correctAnswer }) => {
      if (!selectedAnswers[id]) {
        allAnswered = false;
      }
      results[id] = selectedAnswers[id] === correctAnswer;
      if (results[id]) {
        correctCount++;
      }
    });

    if (!allAnswered) {
      setError("Per favore rispondi a tutte le domande.");
      return;
    }

    setError(null);
    setCheckedAnswers(results);
    alert(`Risposte corrette: ${correctCount}/${questions.length}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
      <form className="w-full max-w-lg">
        {questions.map(({ id, question, options, correctAnswer }) => (
          <div key={id} className="mb-4 p-4 rounded-md bg-gray-700">
            <p className="text-white">{question}</p>
            {options.map(option => (
              <div key={option} className="flex items-center mb-2">
                <input
                  type="radio"
                  name={id}
                  value={option}
                  checked={selectedAnswers[id] === option}
                  onChange={() => handleOptionChange(id, option)}
                  className="mr-2"
                />
                <label className="text-white">{option}</label>
                {checkedAnswers[id] !== undefined && (
                  <>
                    {option === correctAnswer && (
                      <span className="ml-2 text-green-500">✅</span>
                    )}
                    {option === selectedAnswers[id] && option !== correctAnswer && (
                      <span className="ml-2 text-red-500">❌</span>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        ))}
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="flex justify-center">
          <button type="button" onClick={checkAnswers} className="mt-4 py-2 bg-blue-500 text-white rounded">
            Verifica Risposte
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;