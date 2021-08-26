import {useEffect, useState} from "react";

export const useFetchHook = (url, pathname) => {

    const [data, setData] = useState({});
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState(null);

    const id = pathname.split('/')[2];

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_ENTRYPOINT}/${url}/${id}`)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(err => setError(err))
            .finally(() => setIsFetching(false))
    }, [id]);

    return {
        data,
        isFetching,
        error
    }
}