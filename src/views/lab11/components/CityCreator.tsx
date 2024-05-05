import React, {useContext} from "react";
import {EnterpriseContext} from "@/views/lab11";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {useRx} from "@/lib/utils";

const formSchema = z.object({
    name: z.string()
})

type FormTyping = z.infer<typeof formSchema>;

export default function CityCreator() {
    const manager = useContext(EnterpriseContext);

    const form = useForm<FormTyping>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ""
        }
    });

    const onSubmit = form.handleSubmit((data: FormTyping) => {
        manager.addCity(data.name);
        form.reset();
    }, console.error)

    const {isLoading: isCitiesListLoading} = useRx(manager.citiesList$);

    return (
        <form onSubmit={onSubmit}>
            <Card className={"max-w-xl w-full"}>
                <Form {...form}>
                    <CardHeader>
                        City creation
                    </CardHeader>
                    <CardContent>
                        <FormField
                            control={form.control}
                            name={"name"}
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input {...field} placeholder={"City name"}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter>
                        <Button disabled={isCitiesListLoading}>
                            <Plus size={14} className={"mr-2"}/>
                            {
                                isCitiesListLoading ? "Loading..." : "Create"
                            }
                        </Button>
                    </CardFooter>
                </Form>
            </Card>
        </form>
    )
}