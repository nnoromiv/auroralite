import React, { useEffect, useState } from 'react';
import { CountDownProps } from '../types';

const CountDown: React.FC<CountDownProps> = ({ seconds }) => {
    const [timeLeft, setTimeLeft] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        localStorage.setItem('countdownStartTime', Math.floor(1712414616067 / 1000).toString());
    }, []);

    useEffect(() => {
        // Check if countdown start time is stored in localStorage
        const startTimeString = localStorage.getItem('countdownStartTime');

        if (startTimeString) {
            const startTime = parseInt(startTimeString);
            const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
            const elapsedTime = currentTime - startTime; // Elapsed time since countdown start


            // Calculate remaining time
            let remainingTime = seconds - elapsedTime;
            if (remainingTime < 0) {
                remainingTime = 0;
            }
            // Start countdown
            const countDownInterval = setInterval(() => {
                remainingTime--
                updateTimeLeft(remainingTime);
            }, 1000);

            return () => {
                clearInterval(countDownInterval);
            };
        }
    }, [seconds]);

    // Function to update countdown state
    const updateTimeLeft = (remainingSeconds: any) => {
        if (!isNaN(remainingSeconds) && remainingSeconds >= 0) {
            const hours = Math.floor(remainingSeconds / 3600);
            const minutes = Math.floor((remainingSeconds % 3600) / 60);
            const secs = remainingSeconds % 60;
            setTimeLeft({ hours, minutes, seconds: secs });
        } else {
            setTimeLeft({ hours: 0, minutes: 0, seconds: 0 }); // Reset countdown if remainingSeconds is not valid
        }
    };

    return (
        timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0 ?
            <div className='relative z-10 px-3 text-white font-bold text-4xl mt-5 md:text-5xl dark:text-white'>
                Times Up!!!
            </div>
            :
            <div className='relative z-10 px-3 text-white font-bold text-4xl mt-5 md:text-5xl dark:text-white'>
                {timeLeft.hours} hours, {timeLeft.minutes} minutes, {timeLeft.seconds} seconds
            </div>
    );
};

export default CountDown;
