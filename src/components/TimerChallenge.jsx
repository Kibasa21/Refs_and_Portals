import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

//let timer;

export default function TimerChallenge ({title, targetTime}) {

    // const [timerStarted, setTimerStarted] = useState(false);
    // const [timerExpired, setTimerExpired] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(targetTime*1000);
    const timer = useRef();
    const dialog = useRef();

    // function handleStart () {
    //     timer.current = setTimeout(() => {
    //         setTimerExpired(true);
    //         setTimerStarted(false);
    //         dialog.current.open(); //Esse show modal serve para esconder a janela de dialog e só mostrar quando ele for ativado e com um fundo protetor do resto do site
    //     }, targetTime*1000); // referenciei o show model com o open
    //     setTimerStarted(true);
    // }

    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime*1000;

    if (timeRemaining <=0) {
        clearInterval(timer.current);
        dialog.current.open();
    }

    function handleReset () {
        setTimeRemaining(targetTime*1000);
    }

    function handleStart () {
        timer.current = setInterval(() => {
            setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10)
        }, 10);
    }

    function handleStop () {
        dialog.current.open();
        clearInterval(timer.current);
    }

    return (
        <>
            <ResultModal ref={dialog} targetTime={targetTime} remainingTime={timeRemaining} onReset={handleReset}/> {/* o ref pode ser usado como prop ainda com a ajuda do forwardRef */}
            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={timerIsActive ? handleStop : handleStart}>{timerIsActive ? 'Stop' : 'Start'} Challenge</button>
                </p>
                <p className={timerIsActive ? 'active' : undefined}>
                    {timerIsActive ? 'Time is running...' : 'Timer inactive'}
                </p>
            </section>
        </>
    );
}