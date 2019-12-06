import * as React from 'react';
import useFetch, { createUrl } from "@codecolde/use-fetch";
import { Country, Data } from '../pages/All';
import { Link } from 'react-router-dom';

interface Props {
    currentCountry?: string;
}

const PrevComponent: React.FC<Props> = ({ currentCountry }) => {
    const [previous, setprevious] = React.useState('');
    const allUrl = createUrl("https://restcountries.eu/rest/v2/all");
    const [loading, data]: [boolean, Data] = useFetch(allUrl, {}, "all_countries", "session");

    React.useEffect(() => {
        const currCountryIndex = data.findIndex((elem: Country) => elem.name === currentCountry);
        const previousCountryIndex = currCountryIndex - 1;
        const previousCountry = previousCountryIndex <= 0
            ? data[0].name
            : data[previousCountryIndex].name;

        if (data && data[0] && (!previous || previous !== previousCountry)) {
            setprevious(previousCountry);
        }
    }, [previous, data, currentCountry]);

    return (
        <div>
            {loading
                ? <p>loading...</p>
                : data && !!data.isError
                    ? <p>Error</p>
                    : <Link to={`/${previous}/`}>Previous Country ({previous})</Link>
            }
        </div>
    );
};

export default PrevComponent;