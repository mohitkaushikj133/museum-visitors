import { Request, Response, NextFunction } from 'express';
// import axios, { AxiosResponse } from 'axios';
import utils from '../utils';
import { VisitorsResponseTypes } from '../models';
import { MuseumService } from "../services/museum-service";

export class Controller {
    async getVisitorsData(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const museumService: MuseumService = new MuseumService();
            let epoch: number = Number(req.query['date']);

            if(isNaN(epoch)) { // if date is not entered in query params
                return res.status(500).send({"message": 'date is required in query params'});
            }
            let ignore: string | undefined = req.query.ignore as string;
            let visitorsData: VisitorsResponseTypes = await museumService.getVisitorsData(epoch, ignore);
            return res.status(200).send(visitorsData);
        } catch(err) {
            return res.status(500).send({ "error": err});
        }
    };
}