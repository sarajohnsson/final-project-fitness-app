import { useEffect, useState } from 'react';
import axios from 'axios';

function UseFetch(url, apiKey) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios
            .get(url, { headers: { Authorization: `Client-ID ${apiKey}` } })
            .then((response) => {
                setData(response.data);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [url, apiKey]);

    return { data, loading, error };
}
