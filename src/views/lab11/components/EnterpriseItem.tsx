import React, {useContext} from "react";
import {Enterprise} from "@/views/lab11/utils";
import {TableCell, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {Trash, X} from "lucide-react";
import {EnterpriseContext} from "@/views/lab11";

export default function EnterpriseList({enterprise}: { enterprise: Enterprise }) {
    const manager = useContext(EnterpriseContext);

    return (
        <>
            <TableRow>
                <TableCell>
                    {enterprise.name}
                </TableCell>
                <TableCell className={"text-right"}>
                    <Button onClick={() => void manager.deleteEnterprise(enterprise.id)}
                            type={"button"}
                            variant={"destructive"}
                            size={"sm"}
                    >
                        <Trash size={14}/>
                    </Button>
                </TableCell>
            </TableRow>
        </>
    )
}