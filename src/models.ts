// interface Data {
//   [key: string]: string | undefined
// }

interface Museum {
    month: string;
    america_tropical_interpretive_center: string;
    avila_adobe: string;
    chinese_american_museum: string;
    firehouse_museum: string;
    hellman_quon: string;
    pico_house: string;
    visitor_center_avila_adobe: string;

    // getValue(key){
    //     return this[key];
    // }
}

interface Data {
    museum: string;
    visitors: number;
}

interface VisitorsResponse {
    attendance: {
        month: string;
        year: string;
        highest: Data;
        lowest: Data;
        ignored?: Data;
        total: number;
    };
}
export interface Message {
    message: string
}

type VisitorsResponseTypes = VisitorsResponse | {}

export { Museum, VisitorsResponse, Data, VisitorsResponseTypes };