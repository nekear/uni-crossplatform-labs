import React from "react";
import {z} from "zod";
import {useFieldArray, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Badge} from "@/components/ui/badge";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Calculator} from "lucide-react";

const formSchema = z.object({
    a: z.coerce.number(),
    b: z.coerce.number(),
})

type FormTyping = z.infer<typeof formSchema>

export default function Task2(){
    const form = useForm<FormTyping>({
        resolver: zodResolver(formSchema)
    })

    const [result, setResult] = React.useState<number>()

    const onSubmit = form.handleSubmit((data) => {
        const {start, end} = data.a > data.b ? {start: data.b, end: data.a} : {start: data.a, end: data.b}

        // На заданому проміжку чисел [a,b] підрахуйте добуток чисел, кратних 11 і таких, що при діленні на 5 дають в остачі 2.
        let product = 1;
        for (let i = start; i <= end; i++) {
            if (i % 11 === 0 && i % 5 === 2) {
                product *= i;
            }
        }
        setResult(product);

        form.setValue("a", start)
        form.setValue("b", end)
    });

    return (
        <Card className="w-[380px]">
            <Form {...form}>
                <form onSubmit={onSubmit}>
                    <CardHeader className={"space-y-4"}>
                        <CardTitle className={"flex items-center justify-between"}>
                            <span>Task 2</span>
                            {
                                !!result &&
                                <Badge>Result: {result}</Badge>
                            }
                        </CardTitle>
                        <CardDescription>
                            На заданому проміжку чисел [a,b] підрахуйте добуток чисел, кратних 11 і таких, що при діленні на 5 дають в остачі 2.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-2">
                            <FormField
                                control={form.control}
                                name={"a"}
                                render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input {...field} placeholder={"a"} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={"b"}
                                render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input {...field} placeholder={"b"}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
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