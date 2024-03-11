import React, {useRef} from "react";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {RotateCw} from "lucide-react";
import {Chart as ChartJS, ChartData, registerables} from "chart.js";
import {Chart} from "react-chartjs-2"

ChartJS.register(...registerables);

const formSchema = z.object({
    a: z.coerce.number().positive(),
    x: z.coerce.number(),
})

type FormTyping = z.infer<typeof formSchema>

/**
 * Functions, used in the lab, according to the 12th variant.
 */
const fs: ((x: number) => number)[] = [
    x => Math.pow(x, 3) - Math.log(Math.abs(x) + 1),
    x => (2 * x + 2) / (Math.tan(2 * x - 1) + 1),
    x => Math.pow(x, 4) - Math.pow(x, x),
]

const startingValues = {
    xn: -1.25, // початкове значення
    xk: 9.39, // кінцеве значення
    xh: 0.4, // крок
}

export default function Lab2() {
    const form = useForm<FormTyping>({
        resolver: zodResolver(formSchema)
    })

    const [chartData, setChartData] = React.useState<ChartData>({
        labels: [],
        datasets: [],
    })

    const onSubmit = form.handleSubmit((data) => {
        // Building chart labels
        const labels = Array.from(
            {
                length: Math.floor((startingValues.xk - startingValues.xn) / startingValues.xh)
            },
            (_, i) => (startingValues.xn + i * startingValues.xh).toFixed(2)
        )

        // Building chart datasets
        let selectedFunc: (x: number) => number;

        if (data.x <= 0) {
            selectedFunc = fs[0]
        } else if (data.x > 0 && data.x <= data.a) {
            selectedFunc = fs[1]
        } else if (data.x > data.a) {
            selectedFunc = fs[2]
        } else {
            return;
        }

        const datasets = [{
            label: `f(x)`,
            data: labels.map(x => selectedFunc(parseFloat(x))),
            borderColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
            fill: false,
        }]

        setChartData({
            labels,
            datasets,
        })
    });

    return (
        <ResizablePanelGroup
            direction="vertical"
            className="w-full rounded-lg border"
        >
            <ResizablePanel defaultSize={50}>
                <div className="flex h-[500px] items-center justify-center p-6">
                    <Chart
                        type={"line"}
                        options={{
                            responsive: true,
                        }}
                        data={chartData}
                    />
                </div>
            </ResizablePanel>
            <ResizableHandle withHandle/>
            <ResizablePanel defaultSize={10}>
                <div className="flex h-[200px] items-center justify-center p-6 mt-10">
                    <Form {...form}>
                        <form onSubmit={onSubmit}>
                            <div className="space-y-2">
                                <FormField
                                    name={`a`}
                                    control={form.control}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input {...field} placeholder={`a`}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name={`x`}
                                    control={form.control}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input {...field} placeholder={`x`}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <Button type={"submit"} className={"w-full"}>
                                    <RotateCw className="mr-2 h-4 w-4"/>
                                    <span>Rebuild</span>
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}