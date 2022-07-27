import { Museum, VisitorsResponse, Data, VisitorsResponseTypes } from "../models"
import utils from "../utils";
import { MuseumRepository } from "../repository/museum-repository";

export class MuseumService {
	museumRepo: MuseumRepository = new MuseumRepository();
	async getMuseumsData(): Promise<[Museum]> {
		// fetch musems visitors data from api
		return await this.museumRepo.getMuseumsData();
	}

	public async getVisitorsData(epoch: number , ignore: string | undefined): Promise<VisitorsResponseTypes> {
		// fetch and convert museums visitors data from api to a custom api response format 
		// for specific epoch and a ignored museum
		const museumService: MuseumService = new MuseumService();
        let museums: [Museum] = await museumService.getMuseumsData();

        try {
            let customDate: string = utils.getCustomFormatDate(epoch);
			let monthData: Museum, isIgnored: Boolean, finalResponse: VisitorsResponse;
            let filteredMonthData: Museum[] = museums.filter(function (obj) {
                if(obj.month == customDate) {
                    return true;
                }
            });

            if(filteredMonthData.length == 0) { // if there is not data present for the input date
				return {};
            }

            monthData = filteredMonthData[0];
            isIgnored = typeof ignore != 'undefined';
            finalResponse = utils.getDefaultVisitorResponse(isIgnored);

            if(isIgnored) {
				let ignoreString: string = String(ignore);
                this.updateFinalResponseWithIgnoredData(ignoreString, monthData, finalResponse);
            }
            this.updateFinalResponseData(monthData, epoch, finalResponse);

            return finalResponse;
        } catch(err) {
            throw err;
        }
	}

	private updateFinalResponseWithIgnoredData(ignore: string, 
		monthData: Museum, 
		finalResponse: VisitorsResponse
	) {
		// update finalResponse with ignoredData
		let ignoreData: Data = {"museum": "", "visitors": 0};
		ignoreData["museum"] = ignore
		ignoreData["visitors"] = parseInt(monthData[ignore as keyof Museum])
		finalResponse["attendance"]["ignored"] = ignoreData;
		delete monthData[ignore as keyof Museum];
	}

	private updateFinalResponseData(monthData: Museum, 
				epoch: number, finalResponse: VisitorsResponse
			) {
		// update finalResponse with data apart from ignored data
		finalResponse["attendance"]["highest"] = utils.getHighestVisitor(monthData);
		finalResponse["attendance"]["lowest"] = utils.getLowestVisitor(monthData);
		finalResponse["attendance"]["month"] = utils.getMonth(epoch);
		finalResponse["attendance"]["year"] = utils.getYear(epoch);
		finalResponse["attendance"]["total"] = utils.getTotal(monthData);
	}
}