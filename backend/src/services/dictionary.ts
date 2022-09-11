import axios from 'axios';

export default class Dictionary {
  private DICTIONARY_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
  private word: string;
  constructor(word: string) {
    this.word = word;
  }

  public async searchWordInDictionary() {
    try {
      const response = await axios.get(`${this.DICTIONARY_URL}${this.word}`);

      if (response) {
        return true;
      }
    } catch (error) {
      return false;
    }
  }
}
