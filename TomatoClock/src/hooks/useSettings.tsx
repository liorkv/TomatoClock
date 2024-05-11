import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";

const useSettings = () => {
  const axiosPrivate = useAxiosPrivate();

  const getSettings = async () => {
    const response = await axiosPrivate.get("/user/settings");
    return response.data;
  };

  const { isLoading, data, error } = useQuery({
    queryKey: ["settings"],
    queryFn: () => getSettings(),
  });

  return {
    settings: data,
    isLoading,
    error,
  };
};

export default useSettings;
