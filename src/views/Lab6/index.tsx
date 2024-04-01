import React, {useState} from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {Employee, Engineer} from "@/views/Lab6/types";
import {isEngineer} from "@/views/Lab6/logic";
import {people} from "ionicons/icons";
import {Button} from "@/components/ui/button";


export default function Lab6() {
    const reinitEmployees = () => {
        const getSalary = () => Math.floor(Math.random() * 10000) + 1;

        return [
            new Employee("John Doe", 30, "Acme Corp", getSalary()),
            new Employee("Alice Smith", 32, "Beta Corp", getSalary()),
            new Employee("Bob Johnson", 34, "Gamma Corp", getSalary()),
            new Engineer("Jane Doe", 35, "Tech Corp", getSalary(), "Software Engineering"),
            new Engineer("Charlie Brown", 37, "Innov Corp", getSalary(), "Civil Engineering")
        ]
    }

    const [employees, setEmployees] = useState(reinitEmployees());

    return (
        <div className={"flex justify-center items-center w-full h-full"}>
            <Card className={"max-w-3xl w-full"}>
                <CardHeader className={"flex flex-row items-center justify-between"}>
                    <h2 className="text-xl font-semibold">Our employees!</h2>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Intro</TableHead>
                                <TableHead>Work</TableHead>
                                <TableHead>More</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                employees.map((person, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell>{person.introduce()}</TableCell>
                                            <TableCell>{person.work()}</TableCell>
                                            <TableCell>
                                                {
                                                    isEngineer(person) && (
                                                        <span>{person.design()}</span>
                                                    )
                                                }
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </CardContent>

                <CardFooter>
                    <Button onClick={() => setEmployees(reinitEmployees())}>Update salary</Button>
                </CardFooter>
            </Card>
        </div>
    )
}
