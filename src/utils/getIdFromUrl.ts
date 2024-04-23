export function getIdFromUrl(url: string) {
  const splitedUrl = url.split("/");
  const characterId = splitedUrl[splitedUrl.length - 1];

  return characterId;
}
