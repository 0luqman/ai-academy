"use client";

import React, { useState, useMemo } from 'react';
import { Check, X, HelpCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Question {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation?: string;
}

interface QuizProps {
    title?: string;
    questions: Question[] | string;
}

export default function Quiz({ title = "Test Your Knowledge", questions = [] }: QuizProps) {
    // Handle questions if passed as a JSON string (sometimes happens in MDX)
    const processedQuestions = useMemo(() => {
        if (typeof questions === 'string') {
            try {
                return JSON.parse(questions) as Question[];
            } catch (e) {
                console.error("Failed to parse questions JSON:", e);
                return [];
            }
        }
        return (questions || []) as Question[];
    }, [questions]);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [answers, setAnswers] = useState<(number | null)[]>([]);

    // Initialize answers when processedQuestions changes
    React.useEffect(() => {
        setAnswers(new Array(processedQuestions.length).fill(null));
    }, [processedQuestions]);

    if (!processedQuestions || processedQuestions.length === 0) {
        return (
            <div className="w-full max-w-2xl mx-auto my-12 p-8 rounded-3xl border border-dashed border-border bg-muted/20 text-center text-muted-foreground italic">
                No quiz questions available for this lesson.
            </div>
        );
    }

    const currentQuestion = processedQuestions[currentQuestionIndex];
    if (!currentQuestion) return null;

    const isCorrect = selectedOption === currentQuestion.correctAnswer;

    const handleOptionSelect = (index: number) => {
        if (isSubmitted) return;
        setSelectedOption(index);
    };

    const handleSubmit = () => {
        if (selectedOption === null) return;

        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex] = selectedOption;
        setAnswers(newAnswers);

        if (isCorrect) {
            setScore(score + 1);
        }
        setIsSubmitted(true);
    };

    const handleNext = () => {
        if (currentQuestionIndex < processedQuestions.length - 1) {
            const nextIndex = currentQuestionIndex + 1;
            setCurrentQuestionIndex(nextIndex);
            setSelectedOption(answers[nextIndex]);
            setIsSubmitted(answers[nextIndex] !== null);
        } else {
            setShowResults(true);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            const prevIndex = currentQuestionIndex - 1;
            setCurrentQuestionIndex(prevIndex);
            setSelectedOption(answers[prevIndex]);
            setIsSubmitted(true);
        }
    };

    const resetQuiz = () => {
        setCurrentQuestionIndex(0);
        setSelectedOption(null);
        setIsSubmitted(false);
        setScore(0);
        setShowResults(false);
        setAnswers(new Array(processedQuestions.length).fill(null));
    };

    if (showResults) {
        return (
            <div className="w-full max-w-2xl mx-auto my-12 p-8 rounded-3xl border border-border bg-card shadow-2xl overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-purple-500 to-primary" />
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-2">
                        <Check className="w-10 h-10 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight">Quiz Completed!</h2>
                    <p className="text-muted-foreground text-lg">
                        You scored <span className="text-foreground font-bold">{score}</span> out of <span className="text-foreground font-bold">{processedQuestions.length}</span>
                    </p>

                    <div className="w-full bg-muted rounded-full h-3 max-w-md mx-auto overflow-hidden">
                        <div
                            className="bg-primary h-full transition-all duration-1000 ease-out"
                            style={{ width: `${(score / processedQuestions.length) * 100}%` }}
                        />
                    </div>

                    <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={resetQuiz}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/80 transition-all active:scale-95"
                        >
                            <RotateCcw size={18} />
                            Try Again
                        </button>
                        <button
                            onClick={() => window.history.back()}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 active:scale-95"
                        >
                            Continue Learning
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-2xl mx-auto my-12 rounded-3xl border border-border bg-card shadow-2xl overflow-hidden flex flex-col transition-all hover:border-primary/20">
            {/* Header */}
            <div className="px-8 py-6 border-b bg-muted/30 flex items-center justify-between">
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Knowledge Check</span>
                    <h3 className="text-xl font-bold">{title}</h3>
                </div>
                <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold">
                    {currentQuestionIndex + 1} / {processedQuestions.length}
                </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1 bg-muted">
                <div
                    className="h-full bg-primary transition-all duration-500 ease-in-out"
                    style={{ width: `${((currentQuestionIndex + 1) / processedQuestions.length) * 100}%` }}
                />
            </div>

            {/* Content */}
            <div className="p-8 space-y-8">
                <div className="space-y-4">
                    <div className="flex gap-3">
                        <HelpCircle className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                        <h4 className="text-lg font-semibold leading-relaxed">
                            {currentQuestion.question}
                        </h4>
                    </div>
                </div>

                <div className="grid gap-3">
                    {currentQuestion.options.map((option, index) => {
                        const isSelected = selectedOption === index;
                        const isCorrectOption = index === currentQuestion.correctAnswer;
                        const showCorrect = isSubmitted && isCorrectOption;
                        const showWrong = isSubmitted && isSelected && !isCorrectOption;

                        return (
                            <button
                                key={index}
                                onClick={() => handleOptionSelect(index)}
                                disabled={isSubmitted}
                                className={cn(
                                    "group relative flex items-center p-4 rounded-xl border-2 text-left transition-all duration-200",
                                    isSelected && !isSubmitted && "border-primary bg-primary/5",
                                    !isSelected && !isSubmitted && "border-border hover:border-primary/50 hover:bg-muted/50",
                                    showCorrect && "border-green-500 bg-green-500/10",
                                    showWrong && "border-red-500 bg-red-500/10",
                                    isSubmitted && !isSelected && !isCorrectOption && "opacity-50 border-border"
                                )}
                            >
                                <div className={cn(
                                    "flex items-center justify-center w-6 h-6 rounded-full border-2 mr-4 shrink-0 transition-colors",
                                    isSelected && !isSubmitted && "border-primary bg-primary text-primary-foreground",
                                    !isSelected && !isSubmitted && "border-muted-foreground/30 group-hover:border-primary/50",
                                    showCorrect && "border-green-500 bg-green-500 text-white",
                                    showWrong && "border-red-500 bg-red-500 text-white"
                                )}>
                                    {showCorrect ? <Check size={14} strokeWidth={3} /> :
                                     showWrong ? <X size={14} strokeWidth={3} /> :
                                     <span className="text-[10px] font-bold">{String.fromCharCode(65 + index)}</span>}
                                </div>
                                <span className={cn(
                                    "text-sm font-medium",
                                    isSelected && !isSubmitted && "text-foreground",
                                    showCorrect && "text-green-700 dark:text-green-400",
                                    showWrong && "text-red-700 dark:text-red-400"
                                )}>
                                    {option}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {isSubmitted && currentQuestion.explanation && (
                    <div className={cn(
                        "p-4 rounded-xl text-sm leading-relaxed animate-in fade-in slide-in-from-top-2",
                        isCorrect ? "bg-green-500/5 text-green-700 dark:text-green-300 border border-green-500/20" : "bg-blue-500/5 text-blue-700 dark:text-blue-300 border border-blue-500/20"
                    )}>
                        <p className="font-bold mb-1">{isCorrect ? "Correct!" : "Keep learning!"}</p>
                        {currentQuestion.explanation}
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="px-8 py-6 border-t bg-muted/10 flex items-center justify-between">
                <button
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0}
                    className="text-sm font-semibold text-muted-foreground hover:text-foreground disabled:opacity-0 transition-all"
                >
                    Back
                </button>

                {!isSubmitted ? (
                    <button
                        onClick={handleSubmit}
                        disabled={selectedOption === null}
                        className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 disabled:opacity-50 transition-all"
                    >
                        Check Answer
                    </button>
                ) : (
                    <button
                        onClick={handleNext}
                        className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 flex items-center gap-2 transition-all"
                    >
                        {currentQuestionIndex === processedQuestions.length - 1 ? "Show Results" : "Next Question"}
                        <ArrowRight size={16} />
                    </button>
                )}
            </div>
        </div>
    );
}
