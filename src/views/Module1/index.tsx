import React from "react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import Step1 from "@/views/Module1/steps/Step1";
import Step2 from "@/views/Module1/steps/Step2";

export default function Module1() {
    const [step, setStep] = React.useState<"step_1" | "step_2">("step_1")
    const [coefficientsCount, setCoefficientsCount] = React.useState<number>(3)

    return (
        <div className={"flex items-center justify-center h-full px-4"}>
            <Tabs value={step}>
                <TabsList>
                    <TabsTrigger value="step_1">Кіл-ть коеф.</TabsTrigger>
                    <TabsTrigger value="step_2">Розрахунок</TabsTrigger>
                </TabsList>
                <TabsContent value="step_1">
                    <Step1 onSubmit={data => {
                        setCoefficientsCount(data.n)
                        setStep("step_2")
                    }}/>
                </TabsContent>
                <TabsContent value="step_2">
                    <Step2 coefficientsCount={coefficientsCount} onPrevious={() => setStep("step_1")}/>
                </TabsContent>
            </Tabs>
        </div>
    )
}