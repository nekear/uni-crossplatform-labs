import {BehaviorSubject} from "rxjs";
import {City, Enterprise} from "@/views/lab11/types";
import {v4 as uuid} from "uuid";
import {firebaseApp} from "@/views/lab11/firebase.config";
import {getDatabase, ref, onValue} from "firebase/database";


export class EnterprisesManager {
    citiesList$ = new BehaviorSubject<City[]>([]);
    currentCityId$ = new BehaviorSubject<string | undefined>(undefined);
    enterprisesList$ = new BehaviorSubject<Enterprise[]>([]);

    constructor() {
        const database = getDatabase(firebaseApp);
        const citiesRef = ref(database, "cities");
        const enterprisesRef = ref(database, "enterprises");

        const sub = onValue(citiesRef, (snapshot) => {
            const data = snapshot.val();

            if(data){
                const citiesValues = Object.values(data) as City[];
                this.citiesList$.next([...citiesValues, ...this.citiesList$.getValue()]);

                // If there is no current city selected, select the first one
                if(this.currentCityId$.getValue() === undefined && citiesValues.length > 0){
                    this.currentCityId$.next(citiesValues[0].id);
                }
            }
        });

        onValue(enterprisesRef, (snapshot) => {
            const data = snapshot.val();

            if(data){
                this.enterprisesList$.next([...Object.values(data) as Enterprise[], ...this.enterprisesList$.getValue()]);
            }
        });
    }

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

