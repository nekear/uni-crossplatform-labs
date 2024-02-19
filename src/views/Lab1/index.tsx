import React from "react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import Task1 from "@/views/Lab1/Task1";
import Task2 from "@/views/Lab1/Task2";
import Task3 from "@/views/Lab1/Task3";

export default function Lab1(){
    return (
        <div className={"flex items-center justify-center h-full px-4"}>
            <Tabs defaultValue="task_1" className="w-[400px]">
                <TabsList>
                    <TabsTrigger value="task_1">Task 1</TabsTrigger>
                    <TabsTrigger value="task_2">Task 2</TabsTrigger>
                    <TabsTrigger value="task_3">Task 3</TabsTrigger>
                </TabsList>
                <TabsContent value="task_1">
                    <Task1 />
                </TabsContent>
                <TabsContent value="task_2">
                    <Task2 />
                </TabsContent>
                <TabsContent value="task_3">
                    <Task3 />
                </TabsContent>
            </Tabs>
        </div>
    )
}