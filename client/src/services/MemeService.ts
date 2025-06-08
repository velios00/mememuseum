import { AxiosResponse } from "axios";
import { Meme } from "../shared/models/Meme.model";
import { API } from "../axios/Interceptors";


export function getMemes(
  filter: string,
  page: number,
  tags: string[] = [],
  userId?: number
): Promise<AxiosResponse<Meme[]>> {
  const params: any = { filter, page}

  if (tags.length > 0) {
    params.tags = tags.join(",");
  }

  if(userId !== undefined) {
    params.userId = userId;
  }

  return API.get(`${API.defaults.baseURL}/memes`, { params})
}

export function uploadMeme(formData: FormData): Promise<AxiosResponse<Meme>> {
  return API.post(`${API.defaults.baseURL}/upload`, formData, {
    headers: {
        "Content-Type": "multipart/form-data",
        },
    });
}

export function deleteMeme(memeId: number): Promise<AxiosResponse<void>> {
  return API.delete(`${API.defaults.baseURL}/memes/${memeId}`);
}

export function getMemeOfTheDay(): Promise<AxiosResponse<Meme>> {
  return API.get(`${API.defaults.baseURL}/meme-of-the-day`);
}