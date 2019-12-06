import * as React from "react";
import useFetch, { createUrl } from "@codecolde/use-fetch";
import { Link } from "react-router-dom";

export interface Country {
    name: string;
    region: string;
    capital: string;
}

interface FetchError {
    isError: boolean;
    code: number;
    message: string;
    body: string;
}

export type Data = FetchError & Country[];

const All: React.FC = () => {
    const url = createUrl("https://restcountries.eu/rest/v2/all");

    const [loading, data]: [boolean, Data] = useFetch(url, {}, "all_countries", "session");

    return (
        <>
            <h1>All</h1>
            {loading
                ? <p>loading...</p>
                : data && !!data.isError
                    ? <p>Error</p>
                    : <div>
                        <h2>Data</h2>
                        {data && data[0] && data.map((country: Country, i: number) => (
                            <Link to={`${country.name}`} key={i}>
                                <h3>{country.name} ({country.region})</h3>
                            </Link>
                        ))}
                    </div>
            }
        </>
    );
};

export default All;