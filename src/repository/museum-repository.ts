import { Museum } from "../models";
import axios, { AxiosResponse } from 'axios';

export class MuseumRepository {
	url: string = "https://data.lacity.org/resource/trxm-jn3c.json";
	async getMuseumsData(): Promise<[Museum]> {
		try {
			let result: AxiosResponse = await axios.get(this.url);
			let museums: [Museum] = result.data;
			return museums;
		} catch(err) {
			throw "Error While Fetching data from api";
		}
	}
}