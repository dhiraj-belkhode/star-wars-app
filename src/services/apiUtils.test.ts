import {
  fetchData,
  fetchCharacters,
  fetchCharacter,
  fetchHomeworld,
  fetchFilm,
} from "./apiUtils";
import { api } from "./api";
import { Character } from "../types/Character.type";
import { HomeWorld } from "../types/HomeWorld.type";
import { Film } from "../types/Film.type";
import { DataResponse } from "../types/Response.type";

jest.mock("./api", () => ({
  api: {
    get: jest.fn(),
  },
}));

describe("API Utility Functions", () => {
  describe("fetchData", () => {
    it("should fetch data from the given URL and return the data response", async () => {
      const url = "/api/data";
      const responseData = { data: { key: "value" } } as DataResponse<any>;
      (api.get as jest.Mock).mockResolvedValue(responseData);

      const result = await fetchData<any>(url);

      expect(api.get).toHaveBeenCalledWith(url);
      expect(result).toEqual(responseData.data);
    });
  });

  describe("fetchCharacters", () => {
    it("should fetch character data and return an array of Character objects", async () => {
      const responseData = [{ name: "Luke Skywalker" }] as Character[];
      (api.get as jest.Mock).mockResolvedValue({ data: responseData });

      const result = await fetchCharacters();

      expect(api.get).toHaveBeenCalledWith("people/all.json?page=1");
      expect(result).toEqual(responseData);
    });
    it("should fetch characters and return an empty array", async () => {
      (api.get as jest.Mock).mockResolvedValue({ data: undefined });

      const result = await fetchCharacters();

      expect(api.get).toHaveBeenCalledWith("people/all.json?page=1");
      expect(result).toEqual([]);
    });
  });

  describe("fetchCharacter", () => {
    it("should fetch data for a specific character and return a Character object", async () => {
      const id = "1";
      const responseData = { name: "Luke Skywalker" } as Character;
      (api.get as jest.Mock).mockResolvedValue({ data: responseData });

      const result = await fetchCharacter(id);

      expect(api.get).toHaveBeenCalledWith(`/people/${id}`);
      expect(result).toEqual(responseData);
    });
  });

  describe("fetchHomeworld", () => {
    it("should fetch data for a specific homeworld and return a HomeWorld object", async () => {
      const homeworldUrl = "/planets/1";
      const responseData = { name: "Tatooine" } as HomeWorld;
      (api.get as jest.Mock).mockResolvedValue({ data: responseData });

      const result = await fetchHomeworld(homeworldUrl);

      expect(api.get).toHaveBeenCalledWith(homeworldUrl);
      expect(result).toEqual(responseData);
    });
  });

  describe("fetchFilm", () => {
    it("should fetch data for a specific film and return a Film object", async () => {
      const filmUrl = "/films/1";
      const responseData = { title: "A New Hope" } as Film;
      (api.get as jest.Mock).mockResolvedValue({ data: responseData });

      const result = await fetchFilm(filmUrl);

      expect(api.get).toHaveBeenCalledWith(filmUrl);
      expect(result).toEqual(responseData);
    });
  });
});
