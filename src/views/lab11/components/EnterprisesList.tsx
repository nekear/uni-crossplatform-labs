import React, {useContext, useMemo} from "react";
import {EnterpriseContext} from "@/views/lab11";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Select} from "@radix-ui/react-select";
import {SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useRx} from "@/lib/utils";


export default function EnterprisesList() {
    const manager = useContext(EnterpriseContext);

    const citiesList = useRx(manager.citiesList$);
    const currentCityId = useRx(manager.currentCityId$);
    const enterprisesList = useRx(manager.enterprisesList$);

    const filteredEnterprises = useMemo(() => {
        return enterprisesList.filter(x => x.city_id === currentCityId);
    }, [currentCityId, enterprisesList])

    return <>
        <Card className={"max-w-xl w-full"}>
            <CardHeader className={"flex flex-row items-center justify-between"}>
                <h2 className="text-xl font-semibold">Enterprises</h2>
                <Select value={currentCityId} onValueChange={(value) => manager.setCurrentCity(value)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="City"/>
                    </SelectTrigger>
                    <SelectContent>
                        {
                            citiesList.map(x =>
                                <SelectItem value={x.id}>{x.name}</SelectItem>
                            )
                        }
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent>
                {
                    filteredEnterprises.length ?
                        <ul>
                            {
                                filteredEnterprises.filter(x => x.city_id === currentCityId).map(x => <li>{x.name}</li>)
                            }
                        </ul>
                        :
                        <div>
                            No enterprises found for this city!
                        </div>

                }
            </CardContent>
        </Card>
    </>
}