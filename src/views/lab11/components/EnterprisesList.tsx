import React, {useContext, useMemo} from "react";
import {EnterpriseContext} from "@/views/lab11";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Select} from "@radix-ui/react-select";
import {SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useRx} from "@/lib/utils";


export default function EnterprisesList() {
    const manager = useContext(EnterpriseContext);

    const {data: citiesList, isLoading: isCitiesListLoading} = useRx(manager.citiesList$);
    const currentCityId = useRx(manager.currentCityId$);
    const {data: enterprisesList, isLoading: isEnterprisesListLoading} = useRx(manager.enterprisesList$);

    const filteredEnterprises = useMemo(() => {
        return enterprisesList.filter(x => x.city_id === currentCityId);
    }, [currentCityId, enterprisesList])

    return <>
        <Card className={"max-w-xl w-full"}>
            <CardHeader className={"flex flex-row items-center justify-between"}>
                <h2 className="text-xl font-semibold">Enterprises</h2>
                {
                    !isCitiesListLoading &&
                    <>
                        <Select value={currentCityId} onValueChange={(value) => manager.setCurrentCity(value)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="City"/>
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    citiesList.map(x =>
                                        <SelectItem value={x.id} key={x.id}>{x.name}</SelectItem>
                                    )
                                }
                            </SelectContent>
                        </Select>
                    </>
                }
            </CardHeader>
            <CardContent>
                {
                    isEnterprisesListLoading
                        ?
                        "Loading"
                        :

                        filteredEnterprises.length ?
                            <ul>
                                {
                                    filteredEnterprises.map(x =>
                                        <li key={x.id}>{x.name}</li>)
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