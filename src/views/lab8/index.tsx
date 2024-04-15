import React from "react";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {string, z} from "zod";
import {useFieldArray, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Trash} from "lucide-react";

const formSchema = z.object({
    faculty_name: z.string(),
    dean_name: z.string(),
    phone: z.string(),
    address: z.string(),
    departments: z.array(
        z.object({
            name: z.string().trim(),
        })
    )
})

type FormTyping = z.infer<typeof formSchema>

export default function Lab8() {
    const form = useForm<FormTyping>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            departments: [{name: undefined}]
        }
    })

    const {fields: departments, append, remove} = useFieldArray({
        control: form.control,
        name: "departments"
    });


    const onSubmit = form.handleSubmit(console.log, console.error);

    return (
        <form className={"flex justify-center items-center w-full h-full"} onSubmit={onSubmit}>
            <Card className={"max-w-xl w-full"}>
                <Form {...form}>
                    <CardHeader className={"flex flex-row items-center justify-between"}>
                        <h2 className="text-xl font-semibold">Reactive forms</h2>
                    </CardHeader>
                    <CardContent>
                        <div className={"space-y-4"}>
                            <FormField
                                control={form.control}
                                name={"faculty_name"}
                                render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input {...field} placeholder={"Faculty name"}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name={"dean_name"}
                                render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input {...field} placeholder={"Dean name"}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name={"phone"}
                                render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input {...field} placeholder={"Phone"}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name={"address"}
                                render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input {...field} placeholder={"Address"}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <div className={"border border-solid border-gray-200 rounded-[8px] p-2 space-y-4"}>
                                <h6 className="scroll-m-20 text-md font-semibold tracking-tight">Departments</h6>
                                <div className={"space-y-2"}>
                                    {
                                        departments.map((department, index) => (
                                            <div key={department.id} >
                                                <FormField
                                                    control={form.control}
                                                    name={`departments.${index}.name`}
                                                    render={({field}) => (
                                                        <FormItem>
                                                            <div className={"flex flex-row space-x-2"}>
                                                                <FormControl className={"grow"}>
                                                                    <Input {...field} placeholder={"Department name"}/>
                                                                </FormControl>
                                                                <Button onClick={() => remove(index)} type={"button"}
                                                                        variant={"outline"}><Trash size={14}/></Button>
                                                            </div>
                                                            <FormMessage/>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        ))
                                    }
                                </div>
                                <div>
                                    <Button onClick={() => append({name: undefined as unknown as string})} type={"button"}>Add department</Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={onSubmit} className={"w-full"}>
                            Submit
                        </Button>
                    </CardFooter>
                </Form>
            </Card>
        </form>
    )
}