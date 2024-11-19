import { HandPalm, Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { createContext, useEffect, useState } from "react";
import { differenceInSeconds } from "date-fns";

import { NewCylceForm } from "./NewCycleForm";
import { Countdown } from "./Countdown";

import {
    HomeContainer,
    StartCountdownButton,
    StopCountdownButton
} from "./styles";

interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
};

interface CyclesConextType {
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    markCurrentCycleAsFinished: () => void;
};

export const CyclesContext = createContext({} as CyclesConextType);

export function Home() {
    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

    function markCurrentCycleAsFinished() {
        setCycles((state) =>
            state.map(cycle => {
                if (cycle.id === activeCycleId) {
                    return {
                        ...cycle,
                        finishedDate: new Date()
                    }
                } else {
                    return cycle;
                }
            }),
        );
    }

    // function handleCreateNewCycle(data: NewCycleFormData) {
    //     const newCycle: Cycle = {
    //         id: String(new Date().getTime()),
    //         task: data.task,
    //         minutesAmount: data.minutesAmount,
    //         startDate: new Date(),
    //     }

    //     setCycles((state) => [...state, newCycle]);
    //     setActiveCycleId(newCycle.id);
    //     setAmountSecondsPassed(0);

    //     reset();
    // };

    function handleInterruptCycle() {
        setCycles((state) =>
            state.map(cycle => {
                if (cycle.id === activeCycleId) {
                    return {
                        ...cycle,
                        interruptedDate: new Date()
                    }
                } else {
                    return cycle;
                }
            }),
        );
        setActiveCycleId(null);
    };

    // const task = watch('task');
    // const isSubmitDisabled = !task;

    return (
        <HomeContainer>
            <form /*onSubmit={handleSubmit(handleCreateNewCycle)}*/ action="">
                <CyclesContext.Provider value={{ activeCycle, activeCycleId, markCurrentCycleAsFinished }}>
                    {/* <NewCylceForm /> */}
                    <Countdown />
                </CyclesContext.Provider>



                {activeCycle ? (
                    <StopCountdownButton onClick={handleInterruptCycle} type="button">
                        <HandPalm size={24} />
                        Interromper
                    </StopCountdownButton>
                ) : (
                    <StartCountdownButton /*disabled={isSubmitDisabled}*/ type="submit">
                        <Play size={24} />
                        Começar
                    </StartCountdownButton>
                )}
            </form>
        </HomeContainer>
    )
}