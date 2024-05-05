import React from "react";
import {EnterprisesManager} from "@/views/lab11/service";
import EnterprisesList from "@/views/lab11/components/EnterprisesList";
import CityCreator from "@/views/lab11/components/CityCreator";
import EnterpriseCreator from "@/views/lab11/components/EnterpriseCreator";

const enterprisesManager = new EnterprisesManager();
export const EnterpriseContext = React.createContext(enterprisesManager);

export default function Lab11() {
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