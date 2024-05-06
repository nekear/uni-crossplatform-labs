import {BehaviorSubject} from "rxjs";
import {City, Enterprise, handleQuery} from "@/views/lab11/utils";
import {v4 as uuid} from "uuid";
import {getDatabase, onValue, ref, set, remove, Unsubscribe, Database} from "firebase/database";
import {FirebaseApp} from "firebase/app";
import _ from "lodash";

export class EnterprisesManager {
    // Firebase stuff
    private readonly firebaseApp: FirebaseApp;
    private readonly database: Database;
    private readonly firebaseSubscriptions: Unsubscribe[] = [];

    // Manager stuff
    citiesList$ = new QuerySubject<City[]>([]);
    currentCityId$ = new BehaviorSubject<string | undefined>(undefined);
    enterprisesList$ = new QuerySubject<Enterprise[]>([]);

    constructor(firebaseApp: FirebaseApp) {
        this.firebaseApp = firebaseApp;

        this.database = getDatabase(this.firebaseApp);
        const citiesRef = ref(this.database, "cities");
        const enterprisesRef = ref(this.database, "enterprises");

        const citiesSub = onValue(citiesRef, (snapshot) => {
            const data = snapshot.val();

            if (data) {
                const citiesValues = Object.values(data) as City[];
                this.citiesList$.setData([...citiesValues, ...this.citiesList$.getData()]);

                // If there is no current city selected, select the first one
                if (this.currentCityId$.getValue() === undefined && citiesValues.length > 0) {
                    this.currentCityId$.next(citiesValues[0].id);
                }
            }
        });

        const enterprisesSub = onValue(enterprisesRef, (snapshot) => {
            const data = snapshot.val();

            if (data) {
                this.enterprisesList$.setData([...Object.values(data) as Enterprise[], ...this.enterprisesList$.getData()]);
            }
        });

        this.firebaseSubscriptions.push(
            citiesSub,
            enterprisesSub
        )
    }

    unsubscribe() {
        this.firebaseSubscriptions.forEach(sub => sub())
    }

    addCity(cityName: string) {
        const data = [...this.citiesList$.getData(), {id: uuid(), name: cityName}];

        handleQuery({
            collection: "cities",
            firebaseApp: this.firebaseApp,
            query: set,
            data: _.keyBy(data, "id"),
            subject: this.citiesList$
        })
    }

    addEnterprise(enterprise: Omit<Enterprise, "id">) {
        const data = [...this.enterprisesList$.getData(), {id: uuid(), ...enterprise}];

        handleQuery({
            collection: "enterprises",
            firebaseApp: this.firebaseApp,
            query: set,
            data: _.keyBy(data, "id"),
            subject: this.enterprisesList$
        })
    }

    deleteEnterprise(enterprise_id: string) {
        const data = [...this.enterprisesList$.getData().filter(x => x.id != enterprise_id)];

        handleQuery({
            collection: `enterprises/${enterprise_id}`,
            firebaseApp: this.firebaseApp,
            query: remove,
            data: _.keyBy(data, "id"),
            subject: this.enterprisesList$
        })
    }

    setCurrentCity(id: string) {
        this.currentCityId$.next(id);
    }
}

type QuerySubjectGeneric<T> = { data: T, isLoading: boolean };

export class QuerySubject<T> extends BehaviorSubject<QuerySubjectGeneric<T>> {
    constructor(value: T) {
        super({data: value, isLoading: false});
    }

    setData(v: T) {
        this.next({
            data: v,
            isLoading: this.getValue().isLoading
        })
    }

    getData() {
        return this.getValue().data;
    }

    setIsLoading(v: boolean) {
        this.next({
            data: this.getValue().data,
            isLoading: v
        })
    }

    getIsLoading() {
        return this.getValue().isLoading;
    }
}