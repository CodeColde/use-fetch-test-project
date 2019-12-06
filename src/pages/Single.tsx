import * as React from "react";
import { useParams } from "react-router";
import useFetch, { createUrl } from "@codecolde/use-fetch";
import NextComponent from "../components/NextComponent";
import PrevComponent from "../components/PrevComponent";

const Single = () => {
    const { country } = useParams();
    const url = createUrl(`https://restcountries.eu/rest/v2/name/${country && country.toLowerCase()}`);

    const [loading, data] = useFetch(url, {}, country, 'session');

    return (
        <>
            {loading
                ? <p>loading...</p>
                : data && !!data.isError
                    ? <p>Error</p>
                    : <div>
                        <PrevComponent currentCountry={data[0].name}/>
                        <NextComponent currentCountry={data[0].name}/>
                        <h1>{data[0].name}</h1>
                        <h3>{data[0].region}</h3>
                        <h3>{data[0].capital}</h3>
                    </div>
            }
        </>
    );
};

export default Single;
