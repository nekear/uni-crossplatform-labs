import React from "react";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {ChevronRight} from "lucide-react";
import {zodResolver} from "@hookform/resolvers/zod";

const formSchema = z.object({
    n: z.coerce.number().positive().max(5)
})

type FormTyping = z.infer<typeof formSchema>

export default function Step1({onSubmit}: { onSubmit: (data: FormTyping) => void }) {
    const form = useForm<FormTyping>({
        defaultValues: {
            n: 3
        },
        resolver: zodResolver(formSchema)
    })

    return (
        <Card className="w-[380px]">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit, console.error)}>
                    <CardHeader className={"space-y-4"}>
                        <CardTitle className={"flex items-center justify-between"}>
                            <span>Вкажіть кількість коефіцієнтів </span>
                        </CardTitle>
                        <CardDescription>
                            Введіть число від 1 до 5.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
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
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className={"w-full"}>
                            <ChevronRight className="mr-2 h-4 w-4"/>
                            Далі
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    )
}
