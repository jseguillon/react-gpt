const STORAGE_KEY = "OPENAI_API_KEY";

export class ApiKeyHelper {
  static getKey() {
    return localStorage.getItem(STORAGE_KEY) || "";
  }

  static setKey(key: string) {
    localStorage.setItem(STORAGE_KEY, key);
  }
}
