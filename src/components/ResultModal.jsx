import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const ResultModal = forwardRef(function ResultModal ({remainingTime, targetTime, onReset}, ref) { //Essa estrutura com forwardRef e argumento ref fora dos props é essencial
//aparentemente o ({},ref) é necessário caso você só tenha o ref como prop   
    const dialog = useRef();
    const userLost = remainingTime <= 0;
    const formattedRemainingTime = (remainingTime/1000).toFixed(2);
    const score = Math.round((1 - (remainingTime/(1000*targetTime)))*100)

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal(); // serve para deixar tudo que envolve resultmodal no mesmo arqwuivo, ele meio que referencia o showmodal usando open no outro arquivo
            }
        };
    });
    
    return createPortal(
        <dialog onClose={onReset} ref={dialog} className="result-modal"> {/* Usaremos forwardRef pq não dá pra passar refs para outros componentes */}
            {userLost ? <h2>You Lost</h2> : <h2>Your Score: {score}</h2>}
            <p>The target time was <strong>{targetTime} seconds.</strong></p>
            <p>You stopped the timer with <strong>{formattedRemainingTime} seconds left.</strong></p>
            <form method="dialog" onSubmit={onReset}>
                <button>Close</button>
            </form>
        </dialog>
        ,
        document.getElementById('modal')
    );
})

export default ResultModal;