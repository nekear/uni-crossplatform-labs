import {QuerySubject} from "@/views/lab11/service";
import {FirebaseApp} from "firebase/app";
import {getDatabase, ref, set, DatabaseReference} from "firebase/database";

export type City = {
    id: string;
    name: string;
}

export type Enterprise = {
    id: string;
    name: string;
    city_id: string;
}

export type ArrayElementType<T> = T extends Array<infer U> ? U : never;

export function handleQuery<T>(v: {
    collection: string,
    firebaseApp: FirebaseApp,
    query: (ref: DatabaseReference, data: Record<string, ArrayElementType<T>>) => Promise<unknown>;
    data: Record<string, ArrayElementType<T>>,
    subject: QuerySubject<T>,
}) {
    v.subject.setIsLoading(true);

    const database = getDatabase(v.firebaseApp);
    const citiesRef = ref(database, v.collection);

    v.query(
        citiesRef,
        v.data
    )
        .then(() => {
            v.subject.setData(Object.values(v.data) as T);
        })
        .catch(console.error)
        .finally(() => void v.subject.setIsLoading(false))
}

