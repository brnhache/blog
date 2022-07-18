import { useState, useEffect } from 'react';
import { Notyf } from 'notyf';

/**
 * NOTE: add validation for options
 * @param {*} options
 * url: express route
 * body: optional request body
 * errorMessage: optional message for error toast
 * successMessage: optional message for success toast
 * @returns
 */
export const handleFetch = async (options) => {
    const [data, setData] = useState(null);
    const notyf = new Notyf();
    useEffect(() => {
        const fetchData = async (_options) => {
            try {
                if (_options.url) {
                    const res = _options.body
                        ? await fetch(_options.url, _options.body)
                        : await fetch(_options.url);
                    setData(await res.json());
                } else {
                    throw new Error('no url provided to useFetch');
                }
            } catch (err) {
                if (_options.errorMessage) {
                    notyf.error(_options.errorMessage);
                }
                console.error(err.message);
            }
        };
        fetchData(options);
    }, [options.url]);

    return data;
};

/**
 *
 * @param {*} arr
 * @param {*} size
 * @returns 2d array for displaying posts in a grid
 */
export const chunkArray = (arr, size) => {
    const groupedArray = [];
    for (let i = 0; i < arr.length; i += size) {
        groupedArray.push(arr.slice(i, i + size));
    }
    return groupedArray;
};