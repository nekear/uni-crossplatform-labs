import React from "react";
import {Button} from "@/components/ui/button";
import {AlignJustify} from "lucide-react";
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {Link} from "react-router-dom";
import {useLocation} from "react-router";
import {Badge} from "@/components/ui/badge";

type MenuNavProps = {
    items: {
        title: string;
        route: string;
    }[]
}

export default function MenuNav({items}: MenuNavProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const location = useLocation();

    return <Sheet>
        <div className={"border-b border-solid border-border p-4 fixed top-0 left-0 w-full z-40"}>
            <SheetTrigger>
                <Button variant={"ghost"}>
                    <AlignJustify className={"h-6 w-6"}/>
                </Button>
            </SheetTrigger>
        </div>
        <SheetContent side={"left"}>
            <SheetHeader>
                <SheetTitle className="border-b border-solid border-border pb-4">Menu</SheetTitle>
                <SheetDescription>
                    <div className={"space-y-2"}>
                        {items.map((item, index) => {
                                const isCurrentRoute = location.pathname === item.route;

                                return (
                                    <Link key={index} to={item.route} className={"block"}>
                                        <SheetTrigger className={"w-full"}>
                                            <Button
                                                className={"w-full justify-start"}
                                                variant={isCurrentRoute ? "default" : "outline"}
                                            >
                                                <Badge variant={isCurrentRoute ? "secondary" : "default"}
                                                       className={"rounded-[4px] mr-4"}>{index + 1}</Badge>
                                                <span>{item.title}</span>
                                            </Button>
                                        </SheetTrigger>
                                    </Link>
                                )
                            }
                        )}
                    </div>
                </SheetDescription>
            </SheetHeader>
        </SheetContent>
    </Sheet>

}