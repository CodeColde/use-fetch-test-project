import * as React from 'react';
import useFetch, { createUrl } from "@codecolde/use-fetch";
import { Country, Data } from '../pages/All';
import { Link } from 'react-router-dom';

interface Props {
    currentCountry?: string;
}

const NextComponent: React.FC<Props> = ({ currentCountry }) => {
    const [next, setNext] = React.useState('');
    const allUrl = createUrl("https://restcountries.eu/rest/v2/all");
    const [loading, data]: [boolean, Data] = useFetch(allUrl, {}, "all_countries", "session");

    React.useEffect(() => {
        const currCountryIndex = data.findIndex((elem: Country) => elem.name === currentCountry);
        const nextCountryIndex = currCountryIndex + 1;
        const nextCountry = nextCountryIndex > data.length
            ? data[0].name
            : data[nextCountryIndex].name;

        if (data && data[0] && (!next || next !== nextCountry)) {
            setNext(nextCountry);
        }
    }, [next, data, currentCountry]);

    return (
        <div>
            {loading
                ? <p>loading...</p>
                : data && !!data.isError
                    ? <p>Error</p>
                    : <Link to={`/${next}/`}>Next Country ({next})</Link>
            }
        </div>
    );
};

export default NextComponent;