import { useState, useEffect } from "react";
import Description from "../Description/Description";
import Feedback from "../Feedback/Feedback";
import Options from "../Options/Options";
import Notification from "../Notification/Notification";

export default function App() {
    const [feedback, setFeedback] = useState(() => {
        const savedFeedback = localStorage.getItem('num-of-feedback');
        return savedFeedback ? JSON.parse(savedFeedback) : { good: 0, neutral: 0, bad: 0 };
    });
    
    useEffect(() => {
        localStorage.setItem('num-of-feedback', JSON.stringify(feedback))
    }, [feedback])
    
    const updateFeedback = feedbackType => {
        setFeedback(prevFeedback => ({
            ...prevFeedback,
            [feedbackType]: prevFeedback[feedbackType] + 1
        })); 
    };

    const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
    const positiveFeedback = Math.round((feedback.good / totalFeedback) * 100)
    
    const resetFeedback = () => {
        setFeedback({
            good: 0,
            neutral: 0,
            bad: 0
        })
    }
    return (
        <>
            <Description />
            <Options updateFeedback={updateFeedback} resetFeedback={resetFeedback} totalFeedback={ totalFeedback} positiveFeedback={positiveFeedback} />
            {totalFeedback !== 0 ? (<Feedback 
                good={feedback.good}
                neutral={feedback.neutral}
                bad={feedback.bad}
                totalFeedback={totalFeedback}
                positiveFeedback={positiveFeedback}
                />) :
            (<Notification />)}
        </>
    );
}