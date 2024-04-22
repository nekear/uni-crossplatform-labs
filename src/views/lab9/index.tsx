import React from "react";
import {FacultyFormTyping} from "@/views/lab9/types";
import FacultyRecord from "./components/FacultyRecord";
import FacultyConfigurationForm from "@/views/lab9/components/FacultyConfigurationForm";

export default function Lab9() {
    const [faculties, setFaculties] = React.useState<FacultyFormTyping[]>([])

    return (
        <div className={"flex justify-center items-center w-full h-full py-4"}>
            <div className={"w-[500px] space-y-4"}>
                <FacultyConfigurationForm className={"w-full"}
                                          onSubmit={faculty => void setFaculties(p => [faculty, ...p])}
                />
                {
                    faculties.map((faculty, index) => (
                        <FacultyRecord key={index} faculty={faculty}
                                       onRemove={() => void setFaculties(p => [...p.filter((_, i) => i != index)])}
                                       onUpdate={faculty => void setFaculties(p => [...p.map((f, i) => i === index ? faculty : f)])}
                        />
                    ))
                }
            </div>
        </div>
    )
}