import { VisitorsResponse, Data, Museum } from './models';

function getCustomFormatDate(epoch: number): string {
	// from epooch calculate string date in format - "YYYY-MM-DDT00:00:00.000"
	let epochDate: Date = new Date(epoch);
    let year: string = epochDate.getFullYear().toString();
    let month: string = (epochDate.getMonth()+ 1).toString();
    let date: string = epochDate.getDate().toString();

    let customMonth: string = year + "-" + (month.length == 1 ? "0" + month : month) + "-" + 
                        (date.length == 1 ? "0" + date : date) + "T00:00:00.000"
    return customMonth;
}

function getYear(epoch: number): string {
	// get year from epoch in format YYYY
	let epochDate: Date = new Date(epoch);
    let year: string = epochDate.getFullYear().toString();
    return year;
}

function getMonth(epoch: number): string {
	// Get month in short format like "Jul"
	let epochDate: Date = new Date(epoch);
	return epochDate.toLocaleString('en-IN', {month: "short"})
}

function getDefaultData(): Data {
	return {
		"museum": "",
    	"visitors": 0
	}
}

function getDefaultVisitorResponse(ignore: Boolean): VisitorsResponse {
	let defaultVisitorResponse: VisitorsResponse = {
		"attendance": {
	        "month": "",
	        "year": "",
	        "highest": {
	            "museum": "",
	            "visitors": 0
	        },
	        "lowest": {
	            "museum": "",
	            "visitors": 0,
	        },
	        "total": 0
	    }
	};
	if(ignore) {
		defaultVisitorResponse["attendance"]["ignored"] = getDefaultData();
	}
	return defaultVisitorResponse;
}

function getTotal(museum: Museum): number {
	// get total number of visitors for that date
	let total: number = 0;
	for (const [key, value] of Object.entries(museum)) {
		if(key != 'month') {
			total += parseInt(value);
		}
	}
	return total;
}	

function getHighestVisitor(museum: Museum): Data {
	// get museum with highest visitors count
	let max: number = -Infinity;
	let highestVisitor: Data = getDefaultData();
	for (const [key, value] of Object.entries(museum)) {
		if(parseInt(value) > max) {
			highestVisitor["museum"] = key;
			highestVisitor["visitors"] = parseInt(value);
			max = parseInt(value);
		}
	}
	return highestVisitor;
}

function getLowestVisitor(museum: Museum): Data {
	// get museum with lowest visitors count
	let max: number = Infinity;
	let lowestVisitor: Data = getDefaultData();
	for (const [key, value] of Object.entries(museum)) {
		if(parseInt(value) < max) {
			lowestVisitor["museum"] = key;
			lowestVisitor["visitors"] = parseInt(value);
			max = parseInt(value);
		}
	}
	return lowestVisitor;
}


export default { getCustomFormatDate, getDefaultVisitorResponse, getLowestVisitor, getHighestVisitor,
	getYear, getMonth, getTotal }



