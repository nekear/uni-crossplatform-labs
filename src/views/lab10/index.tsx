import React from "react";
import {EnterprisesManager} from "@/views/lab10/service";
import EnterprisesList from "@/views/lab10/components/EnterprisesList";
import CityCreator from "@/views/lab10/components/CityCreator";
import EnterpriseCreator from "@/views/lab10/components/EnterpriseCreator";

const enterprisesManager = new EnterprisesManager();
export const EnterpriseContext = React.createContext(enterprisesManager);

export default function Lab10() {
    return (
        <EnterpriseContext.Provider value={enterprisesManager}>
            <div className={"flex justify-center items-center w-full h-full py-4"}>
                <div className={"w-[500px] space-y-4"}>
                    <EnterprisesList/>
                    <CityCreator/>
                    <EnterpriseCreator/>
                </div>
            </div>
        </EnterpriseContext.Provider>
    )
}