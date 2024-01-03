import axios from "axios";

class FetcherLibs {
  static async GetData(url: string): Promise<any> {
    try {
      const { data } = await axios.get(url);

      return data;
    } catch (error) {
      console.error(error);

      return {};
    }
  }
}

export default FetcherLibs;
