import React from "react";
import {z} from "zod";
import {useFieldArray, useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Calculator, ChevronLeft} from "lucide-react";
import {zodResolver} from "@hookform/resolvers/zod";
import {evaluatePolynomial} from "@/views/Module1/logic";

const formSchema = z.object({
    coefficients: z.array(z.object({
        value: z.coerce.number()
    })),
    x: z.coerce.number()
})

type FormTyping = z.infer<typeof formSchema>

interface Step2Props {
    coefficientsCount: number;
    onPrevious: () => void;
}

export default function Step2(props: Step2Props) {
    const form = useForm<FormTyping>({
        defaultValues: {
            coefficients: Array.from({length: props.coefficientsCount}, () => ({value: 0})),
        },
        resolver: zodResolver(formSchema)
    });

    const [result, setResult] = React.useState<number>()

    const onSubmit = form.handleSubmit((data) => {
        setResult(evaluatePolynomial(data.coefficients.map(x => x.value), data.x))
    });

    const {fields} = useFieldArray({
        control: form.control,
        name: "coefficients"
    })

    return (
        <Card className="min-w-[380px]">
            <Form {...form}>
                <form onSubmit={onSubmit}>
                    <CardHeader className={"space-y-4"}>
                        <CardTitle className={"flex items-center justify-between"}>
                            <span>Вкажіть коефіцієнти</span>
                        </CardTitle>
                        <CardDescription>
                            Введіть коефіцієнти рівняння та натисніть кнопку "Розрахувати".
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className={"space-y-4"}>
                            <div className={"flex flex-row items-center space-x-1"}>
                            <span>
                               P(x)
                            </span>
                                <span>
                                =
                            </span>
                                {
                                    fields.map((field, index) => {
                                        const power = fields.length - index - 1;

                                        return (
                                            <>
                                                <div className={"flex flex-row items-center space-x-1"}>
                                                    <FormField
                                                        control={form.control}
                                                        key={field.id}
                                                        name={`coefficients.${index}.value`}
                                                        render={({field}) => (
                                                            <FormItem>
                                                                <FormControl>
                                                                    <Input {...field} placeholder={`a${index}`}
                                                                           className={"w-[50px] p-[4px] h-8"}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage/>
                                                            </FormItem>
                                                        )}
                                                    />
                                                    {
                                                        power > 0 &&
                                                        <span>
                                                            x
                                                            <sup>{power}</sup>
                                                        </span>
                                                    }
                                                </div>
                                                {
                                                    power > 0 &&
                                                    <span> + </span>
                                                }
                                            </>
                                        )
                                    })
                                }
                            </div>
                            <FormField
                                control={form.control}
                                name={"x"}
                                render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input {...field} placeholder={"x"}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <div className={"grid grid-cols-4 w-full gap-2"}>
                            <Button variant={"ghost"} onClick={props.onPrevious}>
                                <ChevronLeft className="h-4 w-4"/>
                            </Button>
                            <Button type="submit" className={"col-span-3 w-full"}>
                                <Calculator className="mr-2 h-4 w-4"/>
                                Розрахувати
                            </Button>
                        </div>
                    </CardFooter>
                    {
                        result != undefined &&
                        <CardContent>
                            Відповідь: {result}
                        </CardContent>
                    }
                </form>
            </Form>
        </Card>
    )
}
