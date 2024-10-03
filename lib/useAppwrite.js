import { useState, useEffect } from "react";
import { Alert } from "react-native";

const useAppwrite = (fn) => {
    const [data, setData] = useState([]);
  const [loading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await fn();
      setData(response);
    } catch (error) {
      Alert.alert("Error", "Some error occurred in fetching data!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return {data,refetch};
}

export default useAppwrite;