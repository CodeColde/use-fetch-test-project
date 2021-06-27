import { useState, useEffect } from "react";
import getStorageType from "./getStorageType";
import setStorageType from "./setStorageType";
import removeStorageType from "./removeStorageType";

type StorageType = "local" | "session";
type ReturnVal = [boolean, any];
interface IError {
    isError: boolean;
    code: string;
    message: string;
    body: any;
}

function useFetch<T> (url: string | URL, payload?: T, key?: string, type?: StorageType): ReturnVal {
    const items = getStorageType(type, key);
    const [curr, setCurr] = useState(key);
    const [error, setError] = useState<IError | undefined>();
    const [data, setData] = useState(items ? JSON.parse(items) : []);
    const [loading, setLoading] = useState(!items);

    async function fetchData (signal: AbortSignal) {
        setLoading(true);
        try {
            const requestUrl = typeof url === 'string' ? url : url.toString();
            const signalledPayload = {...payload, signal};
            const response = await fetch(requestUrl, signalledPayload);
            const json = await response.json();
            if (response.ok) {
                setData(json);
                setLoading(false);
                if(!!key && !!type) {
                    setStorageType(type, key, JSON.stringify(json));
                }
            } else {
                throw {
                    status: response.status,
                    message: response.statusText,
                    body: json,
                };
            }
        } catch (err) {
            if (err.name === "AbortError") return;
            const val = {
                isError: true,
                code: err.status,
                message: err.message,
                body: err.body
            };
            setLoading(false);
            setError(val);
        } finally {
            if (error && !!type && !!key) {
                removeStorageType(type, key);
            }
        }
    }

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        if (key !== curr) {
            const items = getStorageType(type, key);
            setData(items ? JSON.parse(items) : [])
            setCurr(key);
        }
        if(!items && !error) {
            fetchData(signal);
        }

        return () => {
            controller.abort();
        }
    }, [items, url, curr, error]);

    return error ? [loading, error] : [loading, data];
}

export default useFetch;