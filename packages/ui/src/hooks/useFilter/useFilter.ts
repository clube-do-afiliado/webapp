import { useEffect, useMemo, useState } from 'react';

export default function useFilter<T>(data: T, initialFilter?: (data: T) => T) {
    const [filtered, setFiltered] = useState(data);

    useEffect(() => {
        if (initialFilter) {
            setFiltered(prev => initialFilter(prev));
        } else {
            setFiltered(data);
        }
    }, [data]);

    function filter(fn: (data: T) => T) { setFiltered(prev => fn(prev)); }

    function reset() { setFiltered(data); }

    return useMemo(() => ({ filtered, filter, reset }), [data, filtered]);
} 