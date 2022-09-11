import axios from 'axios';

export default class Dictionary {
  private DICTIONARY_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
  private word: string;

  constructor(word: string) {
    this.word = word;
  }

  public get isWordExist() {
    return (async () => {
      if (!(await this.searchWordInDictionary())) return false;

      return true;
    })();
  }

  private async searchWordInDictionary() {
    try {
      const response = await axios.get(`${this.DICTIONARY_URL}${this.word}`);

      if (response) return response.data;
    } catch (error) {
      return;
    }
  }
}
