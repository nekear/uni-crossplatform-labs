import React from "react";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Book} from "@/views/Lab1/Task3/types";
import {Download, Loader2} from "lucide-react";
import dayjs from "dayjs";
import * as https from "https";

const jsonbinURL = import.meta.env.VITE_LAB3_JSONBIN_ID;
const jsonbinACCESS = import.meta.env.VITE_LAB3_JSONBIN_ACCESS_KEY;

export default function Lab3() {
    const [isBooksLoading, setIsBooksLoading] = React.useState(false);
    const [books, setBooks] = React.useState<Book[]>([]);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsBooksLoading(true);

        try {
            const response = await fetch(`https://api.jsonbin.io/v3/b/${jsonbinURL}`, {
                method: "GET",
                headers: {
                    "X-Access-Key": jsonbinACCESS
                }
            });

            const data = (await response.json()) as {record: (Omit<Book, "due_date" | "issued_at"> & Record<"due_date" | "issued_at", string>)[]};

            setBooks(data.record.map(book => ({
                ...book,
                due_date: dayjs(book.due_date, "YYYY-MM-DD"),
                issued_at: dayjs(book.issued_at, "YYYY-MM-DD")
            })));
        } catch(e) {
            console.error(e);
        } finally {
            setIsBooksLoading(false);
        }
    }

    return (
        <form className={`flex items-center justify-center h-full px-4`} onSubmit={onSubmit}>
            <Card className={"max-w-xl w-full"}>
                <CardHeader className={"flex flex-row items-center justify-between"}>
                    <h2 className="text-xl font-semibold">Books</h2>
                    {
                        isBooksLoading ? (
                            <Button variant="outline" size="sm" disabled>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin"/>
                                Loading...
                            </Button>
                        ) : (
                            <Button variant="outline" size="sm">
                                <Download className={"w-4 h-4 mr-2"}/>
                                Load
                            </Button>
                        )
                    }
                </CardHeader>
                <CardContent>
                    {
                        books.length ?

                            <Table>
                                <TableCaption>Overdue books are highlighted in red.</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">Code</TableHead>
                                        <TableHead>Reader id</TableHead>
                                        <TableHead>Issued at</TableHead>
                                        <TableHead className="text-right">Due date</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                        books.map((book, index) => {
                                            const isOverdue = dayjs().isAfter(book.due_date);
                                            return (
                                                <TableRow key={index} className={isOverdue ? "bg-red-100" : ""}>
                                                    <TableCell>{book.code}</TableCell>
                                                    <TableCell>{book.reader_id}</TableCell>
                                                    <TableCell>{book.issued_at.format("DD.MM.YYYY")}</TableCell>
                                                    <TableCell
                                                        className="text-right">{book.due_date.format("DD.MM.YYYY")}</TableCell>
                                                </TableRow>
                                            )
                                        })
                                    }
                                </TableBody>
                            </Table>
                            :
                            <div className={"flex justify-center items-center h-32 text-slate-400"}>
                                No books found.
                            </div>
                    }
                </CardContent>
            </Card>
        </form>
    )
}