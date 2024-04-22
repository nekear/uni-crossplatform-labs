import React, {useState} from "react";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {FacultyFormTyping} from "@/views/lab9/types";
import {Button} from "@/components/ui/button";
import {Pencil, Save, X} from "lucide-react";
import {cn} from "@/lib/utils";
import {useForm} from "react-hook-form";
import {l} from "vite/dist/node/types.d-jgA8ss1A";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";

interface UniRecordProps {
    faculty: FacultyFormTyping;
    onRemove: () => void;
    onUpdate: (faculty: FacultyFormTyping) => void;
}

export default function UniRecord({faculty, onRemove, onUpdate}: UniRecordProps) {
    const [isHoveredOver, setIsHoveredOver] = useState(false);

    const [mode, setMode] = useState<"edit" | "view">("view");

    const form = useForm<FacultyFormTyping>({
        defaultValues: faculty
    });

    const onSubmit = form.handleSubmit(data => {
        onUpdate(data);
        setMode("view");
        console.log("Submitting", data);
    }, console.error);

    return (

        <Card className={cn("max-w-xl w-full transition-all", isHoveredOver && "border-destructive")}>
            <Form {...form}>
                <form onSubmit={onSubmit}>
                    <CardHeader className={"flex flex-row items-center justify-between"}>
                        {
                            mode === "edit"
                                ?
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
                                :
                                <h2 className="text-xl font-semibold">
                                    {faculty.faculty_name}
                                </h2>
                        }

                        <div className="space-x-2">
                            <Button onClick={onRemove}
                                    type={"button"}
                                    variant={"outline"}
                                    onMouseOver={() => void setIsHoveredOver(true)}
                                    onMouseLeave={() => void setIsHoveredOver(false)}
                            >
                                <X size={14}/>
                            </Button>

                            {
                                mode === "view"
                                    ?

                                    <Button onClick={(e) => {
                                        e.preventDefault()
                                        setMode("edit")
                                    }}
                                            type={"button"}
                                            variant={"secondary"}
                                    >
                                        <Pencil size={14}/>
                                    </Button>
                                    :
                                    <Button
                                        type={"submit"}
                                        variant={"secondary"}
                                    >
                                        <Save size={14}/>
                                    </Button>
                            }
                        </div>
                    </CardHeader>
                    <CardContent>
                        {
                            mode === "edit" ? (
                                    <div className={"space-y-2"}>

                                        <FormField
                                            control={form.control}
                                            name={"dean_name"}
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
                                            name={"phone"}
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
                                            name={"address"}
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input {...field} placeholder={"Faculty name"}/>
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                )
                                :
                                <ul>
                                    <li>Dean: {faculty.dean_name}</li>
                                    <li>Address: {faculty.address}</li>
                                    <li>Phone: {faculty.address}</li>
                                </ul>
                        }
                    </CardContent>
                </form>
            </Form>
        </Card>
    )
}