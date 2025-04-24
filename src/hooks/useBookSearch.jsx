import { useState, useEffect } from 'react';
import axios from 'axios';

export const useBookSearch = (query, page) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [books, setBooks] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setBooks([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    
    let cancel;
    axios({
      method: 'GET',
      url: 'https://openlibrary.org/search.json',
      params: { q: query, page: page, limit: 10 },
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setBooks(prevBooks => {
        const newBooks = res.data.docs.filter(b => 
          b.title && b.author_name && b.cover_i
        ).map(b => ({
          key: b.key,
          title: b.title,
          author: b.author_name?.join(', '),
          coverId: b.cover_i,
          firstPublishYear: b.first_publish_year,
          description: b.first_sentence?.[0]
        }));
        
        // Remove duplicates
        return [...new Map([...prevBooks, ...newBooks].map(item => [item.key, item])).values()];
      });
      setHasMore(res.data.docs.length > 0);
      setLoading(false);
    }).catch(e => {
      if (axios.isCancel(e)) return;
      setError(true);
      setLoading(false);
    });

    return () => cancel();
  }, [query, page]);

  return { loading, error, books, hasMore };
};