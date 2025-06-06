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

  return API.get(`http://localhost:3000/memes`, { params})
}

export function uploadMeme(formData: FormData): Promise<AxiosResponse<Meme>> {
  return API.post(`http://localhost:3000/upload`, formData, {
    headers: {
        "Content-Type": "multipart/form-data",
        },
    });
}

export function deleteMeme(memeId: number): Promise<AxiosResponse<void>> {
  return API.delete(`http://localhost:3000/memes/${memeId}`);
}

export function getMemeOfTheDay(): Promise<AxiosResponse<Meme>> {
  return API.get(`http://localhost:3000/meme-of-the-day`);
}