import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {useEffect, useState} from "react";
import {Observable} from "rxjs";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function get<T>(observable$: Observable<T>): T {
    let value;
    observable$.subscribe((v) => value = v).unsubscribe();
    return value as T;
}

export function useRx<T>(observable$: Observable<T>) {
    const [value, setValue] = useState(() => get(observable$));

    useEffect(() => {
        const subscription = observable$.subscribe(setValue);
        return () => subscription.unsubscribe();
    }, [observable$]);

    return value;
}