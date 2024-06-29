import axios from "axios";

const baseURL = "https://api.unsplash.com/";
const API_KEY = "3tMI0COuLgOQinKGQmDcIpS3k-QYKUOKzBesCWiMRlg";

export const getPhotos = async <T> (query: string, page: number): Promise<T> => {
  try {
    const response = await axios.get<T>(`${baseURL}/search/photos`, {
      params: {
        query: query,
        client_id: API_KEY,
        page,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
};
