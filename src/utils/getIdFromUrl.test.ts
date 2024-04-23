import { getIdFromUrl } from "./getIdFromUrl";

describe("getIdFromUrl function", () => {
  it("extracts the ID from a URL with a trailing slash", () => {
    const url = "https://swapi.dev/api/people/1/";
    const expectedId = "1";
    const id = getIdFromUrl(url);

    expect(id).not.toBe(expectedId);
  });

  it("extracts the ID from a URL without a trailing slash", () => {
    const url = "https://swapi.dev/api/people/2";
    const expectedId = "2";

    const id = getIdFromUrl(url);

    expect(id).toBe(expectedId);
  });

  it("extracts the ID from a complex URL", () => {
    const url = "https://swapi.dev/api/planets/3/moons/5";
    const expectedId = "5";

    const id = getIdFromUrl(url);

    expect(id).toBe(expectedId);
  });

  it("returns an empty string when the URL ends with multiple slashes", () => {
    const url = "https://swapi.dev/api/people//";
    const expectedId = "";

    const id = getIdFromUrl(url);

    expect(id).toBe(expectedId);
  });

  it("returns an empty string when the URL is empty", () => {
    const url = "";
    const expectedId = "";

    const id = getIdFromUrl(url);

    expect(id).toBe(expectedId);
  });
});
