import Task1 from "@/views/Lab1/Task1";
import React from "react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";

export default function Lab1(){
    return (
        <div className={"flex items-center justify-center h-full"}>
            <Tabs defaultValue="task_1" className="w-[400px]">
                <TabsList>
                    <TabsTrigger value="task_1">Task 1</TabsTrigger>
                    <TabsTrigger value="task_2">Task 2</TabsTrigger>
                </TabsList>
                <TabsContent value="task_1">
                    <Task1 />
                </TabsContent>
                <TabsContent value="task_2">
                    Hello world
                </TabsContent>
            </Tabs>
        </div>
    )
}