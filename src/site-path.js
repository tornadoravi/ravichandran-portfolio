export const basePath = import.meta.env.BASE_URL;

export function sitePath(path) {
  return `${basePath}${path.slice(1)}`;
}
