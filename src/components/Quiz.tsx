"use client";

import React, { useState } from 'react';
import { Check, X, ChevronRight, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Question {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation?: string;
}

interface QuizProps {
    questions: Question[];
}

export default function Quiz({ questions: initialQuestions }: QuizProps) {
    const questions = React.useMemo(() => {
        if (typeof initialQuestions === 'string') {
            try {
                return JSON.parse(initialQuestions);
            } catch (e) {
                console.error("Failed to parse Quiz questions:", e);
                return [];
            }
        }
        return initialQuestions || [];
    }, [initialQuestions]);

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);

    const handleOptionSelect = (index: number) => {
        if (isSubmitted) return;
        setSelectedOption(index);
    };

    const handleSubmit = () => {
        if (selectedOption === null) return;

        const isCorrect = selectedOption === questions[currentQuestion].correctAnswer;
        if (isCorrect) {
            setScore(prev => prev + 1);
        }
        setIsSubmitted(true);
    };

    const handleNext = () => {
        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(prev => prev + 1);
            setSelectedOption(null);
            setIsSubmitted(false);
        } else {
            setShowResults(true);
        }
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setSelectedOption(null);
        setIsSubmitted(false);
        setScore(0);
        setShowResults(false);
    };

    if (showResults) {
        return (
            <div className="bg-card border rounded-2xl p-8 text-center shadow-lg my-8">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="text-primary w-10 h-10" />
                </div>
                <h2 className="text-3xl font-bold mb-2">Quiz Completed!</h2>
                <p className="text-muted-foreground mb-6">
                    You scored <span className="text-foreground font-bold">{score}</span> out of <span className="text-foreground font-bold">{questions.length}</span>
                </p>
                <div className="w-full bg-muted rounded-full h-3 mb-8 overflow-hidden">
                    <div
                        className="bg-primary h-full transition-all duration-1000"
                        style={{ width: `${(score / questions.length) * 100}%` }}
                    />
                </div>
                <button
                    onClick={resetQuiz}
                    className="bg-primary text-primary-foreground px-8 py-3 rounded-xl font-bold hover:scale-105 transition-all shadow-lg shadow-primary/20"
                >
                    Try Again
                </button>
            </div>
        );
    }

    const question = questions[currentQuestion];

    return (
        <div className="bg-card border rounded-2xl shadow-sm my-8 overflow-hidden">
            <div className="p-6 border-b bg-muted/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <HelpCircle className="text-primary" size={20} />
                    <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                        Question {currentQuestion + 1} of {questions.length}
                    </span>
                </div>
                <div className="text-xs font-mono bg-background px-2 py-1 rounded border">
                    Score: {score}
                </div>
            </div>

            <div className="p-8">
                <h3 className="text-xl font-bold mb-8 leading-snug">
                    {question.question}
                </h3>

                <div className="space-y-3">
                    {question.options.map((option: string, index: number) => {
                        const isSelected = selectedOption === index;
                        const isCorrect = index === question.correctAnswer;
                        const showCorrect = isSubmitted && isCorrect;
                        const showWrong = isSubmitted && isSelected && !isCorrect;

                        return (
                            <button
                                key={index}
                                onClick={() => handleOptionSelect(index)}
                                disabled={isSubmitted}
                                className={cn(
                                    "w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between group",
                                    !isSubmitted && "hover:border-primary/50 hover:bg-primary/5",
                                    !isSubmitted && isSelected ? "border-primary bg-primary/5" : "border-transparent bg-muted/50",
                                    showCorrect && "border-green-500 bg-green-500/10",
                                    showWrong && "border-red-500 bg-red-500/10"
                                )}
                            >
                                <span className="flex-1 text-sm font-medium">{option}</span>
                                <div className={cn(
                                    "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                                    !isSubmitted && isSelected ? "border-primary bg-primary" : "border-muted-foreground/30",
                                    showCorrect && "border-green-500 bg-green-500",
                                    showWrong && "border-red-500 bg-red-500"
                                )}>
                                    {showCorrect && <Check size={14} className="text-white" />}
                                    {showWrong && <X size={14} className="text-white" />}
                                    {!isSubmitted && isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                                </div>
                            </button>
                        );
                    })}
                </div>

                {isSubmitted && question.explanation && (
                    <div className={cn(
                        "mt-6 p-4 rounded-xl text-sm border",
                        selectedOption === question.correctAnswer
                            ? "bg-green-500/5 border-green-500/20 text-green-700 dark:text-green-400"
                            : "bg-blue-500/5 border-blue-500/20 text-blue-700 dark:text-blue-400"
                    )}>
                        <p className="font-bold mb-1">
                            {selectedOption === question.correctAnswer ? "Correct!" : "Note:"}
                        </p>
                        {question.explanation}
                    </div>
                )}
            </div>

            <div className="p-6 bg-muted/30 border-t flex justify-end">
                {!isSubmitted ? (
                    <button
                        onClick={handleSubmit}
                        disabled={selectedOption === null}
                        className="bg-primary text-primary-foreground px-6 py-2 rounded-xl font-bold disabled:opacity-50 transition-all hover:bg-primary/90"
                    >
                        Check Answer
                    </button>
                ) : (
                    <button
                        onClick={handleNext}
                        className="bg-foreground text-background px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:opacity-90 transition-all"
                    >
                        {currentQuestion + 1 < questions.length ? "Next Question" : "Finish Quiz"}
                        <ChevronRight size={18} />
                    </button>
                )}
            </div>
        </div>
    );
}
