import axios, { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

interface IUser {
  id: string;
  name: string | null;
  email: string;
}

export const useUser = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/user/me`, {
        headers: { Authorization: localStorage.getItem("Authorization") },
      });
      setLoading(false);
      setUser(response.data);
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response) {
          setError(error.response.data);
          setLoading(false);
        }
      } else {
        console.log(error);
        setLoading(false);
      }
    }

    // axios
    //   .get(`${BACKEND_URL}/api/v1/user/me`, {
    //     headers: { Authorization: localStorage.getItem("Authorization") },
    //   })
    //   .then((response) => {
    //     setUser(response.data);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     if (error.response) {
    //       setError(error.response.data.msg);
    //       setLoading(false);
    //     } else {
    //       setError(error.message);
    //       setLoading(false);
    //     }
    //   });
  };

  useEffect(() => {
    try {
      fetchUser();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return { user, loading, error };
};
