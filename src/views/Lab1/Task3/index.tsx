import React from "react";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Calculator} from "lucide-react";
import {cn} from "@/lib/utils";

const formSchema = z.object({
    n: z.coerce.number().positive(),
})

type FormTyping = z.infer<typeof formSchema>

type Position = {
    x: number,
    y: number
}

export default function Task3() {
    const form = useForm<FormTyping>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            n: 0
        }
    })

    const [result, setResult] = React.useState<number[][]>()
    const [foundMinMax, setFoundMinMax] = React.useState<Record<"min" | "max", Position>>()

    const onSubmit = form.handleSubmit((data) => {
        // Згенерувати матрицю розміром NxN. Знайти максимальне за модулем значення (позначити зеленим) та мінімальне за модулем (позначити синім).

        let min: Position = {x: 0, y: 0}, max: Position = {x: 0, y: 0};

        // Generating matrix
        const matrix: number[][] = []
        for (let i = 0; i < data.n; i++) {
            matrix[i] = []
            for (let j = 0; j < data.n; j++) {
                const randomValue = Math.floor(Math.random() * 100) - 50;

                if (Math.abs(randomValue) > Math.abs(matrix[max.x][max.y])) {
                    max = {x: i, y: j}
                }

                if(Math.abs(randomValue) < Math.abs(matrix[min.x][min.y])){
                    min = {x: i, y: j}
                }

                matrix[i][j] = randomValue;
            }
        }

        setResult(matrix)
        setFoundMinMax({min, max})
    });

    const getPositionColor = (i: number, j: number) => {
        if(foundMinMax?.min.x === i && foundMinMax?.min.y === j){
            return "bg-blue-500"
        }

        if(foundMinMax?.max.x === i && foundMinMax?.max.y === j){
            return "bg-green-500"
        }

        return ""
    }

    return (
        <Card className="w-[380px]">
            <Form {...form}>
                <form onSubmit={onSubmit}>
                    <CardHeader className={"space-y-4"}>
                        <CardTitle className={"flex items-center justify-between"}>
                            <span>Task 3</span>
                        </CardTitle>
                        <CardDescription>
                            Згенерувати матрицю розміром NxN. Знайти максимальне за модулем значення (позначити зеленим)
                            та мінімальне за модулем (позначити синім).
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-2">
                            <FormField
                                control={form.control}
                                name={"n"}
                                render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input {...field} placeholder={"N"}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>

                        {
                            result && result?.length > 0 &&
                            <div className={"mt-4"}>
                                {
                                    result.map((row, i) => (
                                        <div key={i} className="flex space-x-2">
                                            {
                                                row.map((col, j) => (
                                                    <div key={j} className={cn("flex items-center justify-center w-8 h-8", getPositionColor(i, j))}>
                                                        {col}
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    ))
                                }
                            </div>
                        }
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className={"w-full"}>
                            <Calculator className="mr-2 h-4 w-4"/>
                            Calculate
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    )
}