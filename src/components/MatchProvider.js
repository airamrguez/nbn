import React, { useState, useEffect } from 'react';
import { fetchJSON } from '../utils';

export default function MatchProvider(props) {
  const [match, set] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetchJSON('/match')
      .then(set, setError)
      .finally(() => void setIsLoading(false));
  }, []);

  return props.children({ match, isLoading, error });
}
