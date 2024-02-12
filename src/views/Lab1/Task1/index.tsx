import React from "react";
import {z} from "zod";
import {useFieldArray, useForm} from "react-hook-form";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Calculator} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {zodResolver} from "@hookform/resolvers/zod";

const formSchema = z.object({
    numbers: z.array(
        z.object({
            value: z.coerce.number()
        })
    )
})

type FormTyping = z.infer<typeof formSchema>

export default function Task1() {
    const form = useForm<FormTyping>({
        defaultValues: {
            numbers: [
                {value: 0},
                {value: 0},
                {value: 0},
            ]
        },
        resolver: zodResolver(formSchema)
    })

    const [result, setResult] = React.useState<number>()

    const onSubmit = form.handleSubmit((data) => {
        const sum = data.numbers.reduce((acc, n) => acc + n.value, 0)

        if(data.numbers.some(n => n.value > 5)){
            setResult(Math.pow(sum,3))
        }else{
            setResult(sum)
        }
    });

    const {fields} = useFieldArray({
        control: form.control,
        name: "numbers"
    })

    return (
        <Card className="w-[380px]">
            <Form {...form}>
                <form onSubmit={onSubmit}>
                    <CardHeader className={"space-y-4"}>
                        <CardTitle className={"flex items-center justify-between"}>
                            <span>Task 1</span>
                            {
                                !!result &&
                                <Badge>Result: {result}</Badge>
                            }
                        </CardTitle>
                        <CardDescription>
                            Задано три числа.
                            Якщо хоч одне з них
                            більше за 5, то
                            знайти куб суми. В
                            іншому випадку –
                            суму .
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {fields.map((field, index) => (
                                <div key={field.id}>
                                    <FormField
                                        control={form.control}
                                        name={`numbers.${index}.value`}
                                        render={({field}) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            ))}
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