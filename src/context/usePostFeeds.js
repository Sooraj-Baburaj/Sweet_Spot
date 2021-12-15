import  {useEffect, useState} from 'react';
import { getFeeds } from '../api/postApi';


const usePostFeeds = (num, loggedIn) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [feeds, setFeeds] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        setLoading(true)
        setError(false)
        if(loggedIn) {
            getFeeds(num)
            .then((res) => {
                setFeeds(prev => [...prev, ...res.data])
                setHasMore(res.data.length > 0)
                setLoading(false)
            })
            .catch(() => setError(true))
        }

    },[num,loggedIn])
    return { loading, feeds, hasMore, error}
}

export default usePostFeeds;
