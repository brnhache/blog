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
export const useFetch = async (options) => {
    const [data, setData] = useState(null);
    const notyf = new Notyf();
    useEffect(() => {
        try {
            if (options.url) {
                if (options.body) {
                    fetch(options.url, options.body).then(res => res.json()).then(data => setData(data));
                } else {
                    fetch(options.url).then(res => res.json()).then(data => setData(data));
                }
            } else {
                throw new Error('no url provided to useFetch');
            }
        } catch (err) {
            if (options.errorMessage) {
                notyf.error(options.errorMessage);
            }
            console.error(err.message);
        }
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