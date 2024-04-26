import {BehaviorSubject} from "rxjs";
import {City, Enterprise} from "@/views/lab10/types";
import {v4 as uuid} from "uuid";


export class EnterprisesManager {
    citiesList$ = new BehaviorSubject<City[]>([]);
    currentCityId$ = new BehaviorSubject<string | undefined>(undefined);
    enterprisesList$ = new BehaviorSubject<Enterprise[]>([]);

    addCity(cityName: string) {
        this.citiesList$.next([...this.citiesList$.value, {id: uuid(), name: cityName}]);
    }

    addEnterprise(enterprise: Omit<Enterprise, "id">) {
        this.enterprisesList$.next([...this.enterprisesList$.value, {id: uuid(), ...enterprise}]);
    }

    setCurrentCity(id: string) {
        this.currentCityId$.next(id);
    }
}

