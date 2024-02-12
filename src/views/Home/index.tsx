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

export default function Home() {
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
        const negativeCounter = data.numbers.reduce((acc, curr) => {
            return acc + (curr.value < 0 ? 1 : 0)
        }, 0);

        const sum = data.numbers.reduce((acc, curr) => {
            return acc + Math.abs(curr.value)
        }, 0);

        const multiplication = data.numbers.reduce((acc, curr) => {
            return acc * Math.abs(curr.value)
        }, 1);

        // 0 neg -> sum (2, 3, 4 = 9)
        // 1 neg -> geom of modules (2, -3, 4 = 2.8844)
        // 2 neg -> ari of modules = sum / 3 (-2, -3, 4 = 3)
        // 3 neg -> *

        switch (negativeCounter) {
            case 0:
                setResult(sum)
                break;
            case 1:
                setResult(Math.pow(multiplication, 1/3))
                break;
            case 2:
                setResult(sum / 3)
                break;
            case 3:
                setResult(multiplication * -1)
                break;
        }
    });

    const {fields} = useFieldArray({
        control: form.control,
        name: "numbers"
    })

    return (
        <div className="flex items-center justify-center h-full p-[12px]">
            <Card className="w-[380px]">
                <Form {...form}>
                    <form onSubmit={onSubmit}>
                        <CardHeader className={"space-y-2"}>
                            <CardTitle>Enter 3 numbers</CardTitle>
                            {
                                !!result &&
                                <CardDescription>
                                    Result: <Badge>{result}</Badge>
                                </CardDescription>
                            }
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
        </div>
    )
}