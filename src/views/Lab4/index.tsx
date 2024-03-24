import React from "react";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Shape, Rectangle, Square} from "@/views/Lab4/logic";


export default function Lab4() {
    const shapesArray: Shape[] = [
        new Rectangle(5, 10),
        new Square(5),
        new Rectangle(10, 20),
        new Rectangle(5, 5),
    ]

    return (
        <div className={"flex justify-center items-center w-full h-full"}>
            <Card className={"max-w-xl w-full"}>
                <CardHeader className={"flex flex-row items-center justify-between"}>
                    <h2 className="text-xl font-semibold">Classes</h2>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Properties</TableHead>
                                <TableHead>Area</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                shapesArray.map((shape, index) => {
                                    let propertyString = "Unknown properties";

                                    if (shape instanceof Rectangle) {
                                        propertyString = `Width: ${shape.width}, Height: ${shape.height}`
                                    } else if (shape instanceof Square) {
                                        propertyString = `Side: ${shape.side}`
                                    }

                                    return (
                                        <TableRow key={index}>
                                            <TableCell>{shape.name}</TableCell>
                                            <TableCell>{propertyString}</TableCell>
                                            <TableCell>{shape.getArea()}</TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                        <TableCaption className={"space-x-[4px]"}>
                            <span>Minimal area:</span>
                            <span>{shapesArray.map(x => x.getArea()).sort((a, b) => a - b)[0]}</span>
                        </TableCaption>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}