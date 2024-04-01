import {Employee, Engineer} from "@/views/Lab6/types";

export function isEngineer(obj: Employee): obj is Engineer {
    return obj instanceof Engineer;
}