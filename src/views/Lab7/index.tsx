import React from "react";
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
import {FunctionExpCalculatorService} from "@/views/Lab7/service";
import {fromMapToChartDataset} from "@/views/Lab7/utils";

ChartJS.register(...registerables);

const formSchema = z.object({
    a: z.coerce.number().min(-3 * Math.PI).max(3 * Math.PI),
    b: z.coerce.number().min(-3 * Math.PI).max(3 * Math.PI),
    step: z.coerce.number(),
})

type FormTyping = z.infer<typeof formSchema>

const functionCalculatorService = new FunctionExpCalculatorService();

export default function Lab7() {
    const form = useForm<FormTyping>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            a: -3 * Math.PI,
            b: 3 * Math.PI,
            step: 0.1
        }
    })

    const [charts, setCharts] = React.useState<Record<"main" | "series" | "recursion", ChartData>>()

    const onSubmit = form.handleSubmit((data) => {
        // Determining range start and end
        const start = Math.min(data.a, data.b)
        const end = Math.max(data.a, data.b)

        // Simple utility to apply logValue method for each calculation done in the tabulateFunction method and return value untouched
        const proxyLog = (title: string, x: number, method: (x: number) => number) => {
            const value = method(x);
            functionCalculatorService.logValue(title, x, value)
            return value;
        }

        // Performing tabulation of functions
        setCharts({
            main: fromMapToChartDataset(
                functionCalculatorService.tabulateFunction(start, end, data.step, (x) => proxyLog("e^x", x, Math.exp)),
                "e^x"
            ),
            series: fromMapToChartDataset(
                functionCalculatorService.tabulateFunction(start, end, data.step, (x) => proxyLog("series", x, functionCalculatorService.calculateExpSeries)),
                "series"
            ),
            recursion: fromMapToChartDataset(
                functionCalculatorService.tabulateFunction(start, end, data.step, (x) => proxyLog("recursion", x, x => functionCalculatorService.calculateExpRecursive(x))),
                "recursion"
            ),
        })
    });

    return (
        <ResizablePanelGroup
            direction="horizontal"
            className="w-full rounded-lg border"
        >
            <ResizablePanel defaultSize={50}>
                <div className={"grid grid-cols-2"}>
                    {
                        Object.keys(charts ?? {}).map((key, index) => (
                            <div key={index} className="flex h-[500px] items-center justify-center p-6">
                                <Chart
                                    type={"line"}
                                    options={{
                                        responsive: true,
                                    }}
                                    data={(charts as NonNullable<typeof charts>)[key as keyof typeof charts]}
                                />
                            </div>
                        ))
                    }
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
                                    name={`b`}
                                    control={form.control}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input {...field} placeholder={`b`}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name={`step`}
                                    control={form.control}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input {...field} placeholder={`step`}/>
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