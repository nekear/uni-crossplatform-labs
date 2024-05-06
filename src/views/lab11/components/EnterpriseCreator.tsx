import React, {useContext} from "react";
import {EnterpriseContext} from "@/views/lab11";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Plus, Warehouse} from "lucide-react";
import {useRx} from "@/lib/utils";

const formSchema = z.object({
    name: z.string()
})

type FormTyping = z.infer<typeof formSchema>;

export default function EnterpriseCreator() {
    const manager = useContext(EnterpriseContext);

    const currentCityId = useRx(manager.currentCityId$);

    const form = useForm<FormTyping>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        }
    })

    const onSubmit = form.handleSubmit((data: FormTyping) => {
        if (currentCityId == undefined)
            return;

        manager.addEnterprise({city_id: currentCityId, name: data.name});
        form.reset();
    }, console.error)

    const {isLoading: isEnterprisesListLoading} = useRx(manager.enterprisesList$);

    return (
        <form onSubmit={onSubmit}>
            <Card className={"max-w-xl w-full"}>
                <Form {...form}>
                    <CardHeader className={"flex flex-row space-x-2 items-center justify-between"}>
                        <span>Enterprise creation</span>
                        <Warehouse size={20}/>
                    </CardHeader>
                    <CardContent>
                        <FormField
                            control={form.control}
                            name={"name"}
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input {...field} placeholder={"Enterprise name"}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter>
                        <Button disabled={isEnterprisesListLoading}>
                            <Plus size={14} className={"mr-2"}/>
                            {
                                isEnterprisesListLoading ?
                                    "Loading..."
                                    :
                                    "Create"
                            }
                        </Button>
                    </CardFooter>
                </Form>
            </Card>
        </form>
    )
}