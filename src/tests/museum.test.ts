import { Controller } from '../controllers/museums';
import { MuseumService } from "../services/museum-service";
import { MuseumRepository } from "../repository/museum-repository";
import { VisitorsResponseTypes, Message } from '../models';
import { Request, Response, NextFunction } from 'express';
import { expect } from 'chai';
import 'mocha';

var sinon = require("sinon");
const stubServicegetVisitorsData = () => {
  return [{
    "month": "2014-01-01T00:00:00.000",
    "america_tropical_interpretive_center": "6602",
    "avila_adobe": "24778",
    "chinese_american_museum": "1581",
    "firehouse_museum": "4486",
    "hellman_quon": "0",
    "pico_house": "2204",
    "visitor_center_avila_adobe": "2961"
    },
    {
      "month": "2014-07-01T00:00:00.000",
      "america_tropical_interpretive_center": "13490",
      "avila_adobe": "32378",
      "chinese_american_museum": "2239",
      "firehouse_museum": "5406",
      "hellman_quon": "120",
      "pico_house": "3375",
      "visitor_center_avila_adobe": "3527"
    }
  ];
}

describe('Museum Data', () => {
  var stub: { restore: () => void; };
  
  it('Controller getVisitorsData function success case without ignore', async () => {
    const controller: Controller = new Controller();
    const repo: MuseumRepository = new MuseumRepository();
    // const getVisitorsData = sinon.fake.returns(42);
    const epoch: number = 1404198000000;
    const ignore: string | undefined = undefined;
    const res: VisitorsResponseTypes = {
      "attendance": {
        "month": "Jul",
        "year": "2014",
        "highest": {
          "museum": "avila_adobe",
          "visitors": 32378
        },
        "lowest": {
          "museum": "hellman_quon",
          "visitors": 120
        },
        "total": 60535
      }
    };

    stub= sinon.stub(MuseumRepository.prototype, 'getMuseumsData').callsFake(stubServicegetVisitorsData);
    const museumService: MuseumService = new MuseumService();
    const result = await museumService.getVisitorsData(epoch, ignore);
    expect(JSON.stringify(result)).to.equal(JSON.stringify(res));
    stub.restore();
  });

  it('Controller getVisitorsData function success case with ignore', async () => {
    const controller: Controller = new Controller();
    const repo: MuseumRepository = new MuseumRepository();
    // const getVisitorsData = sinon.fake.returns(42);
    const epoch: number = 1404198000000;
    const ignore: string | undefined = "avila_adobe";
    const res: VisitorsResponseTypes = {
      "attendance": {
        "month": "Jul",
        "year": "2014",
        "highest": {
          "museum": "america_tropical_interpretive_center",
          "visitors": 13490
        },
        "lowest": {
          "museum": "hellman_quon",
          "visitors": 120
        },
        "total": 28157,
        "ignored": {
          "museum": "avila_adobe",
          "visitors": 32378
        }
      }
    };

    stub =sinon.stub(MuseumRepository.prototype, 'getMuseumsData').callsFake(stubServicegetVisitorsData);
    const museumService: MuseumService = new MuseumService();
    const result = await museumService.getVisitorsData(epoch, ignore);
    expect(JSON.stringify(result)).to.equal(JSON.stringify(res));
    stub.restore();
  });

  it('Museum data not present for date', async () => {
    const controller: Controller = new Controller();
    const repo: MuseumRepository = new MuseumRepository();
    // const getVisitorsData = sinon.fake.returns(42);
    const epoch: number = 123;
    const ignore: string | undefined = "avila_adobe";
    const res: VisitorsResponseTypes = {}

    stub=sinon.stub(MuseumRepository.prototype, 'getMuseumsData').callsFake(stubServicegetVisitorsData);
    const museumService: MuseumService = new MuseumService();
    const result = await museumService.getVisitorsData(epoch , ignore);
    
    expect(JSON.stringify(result)).to.equal(JSON.stringify(res));
    stub.restore();
  });

  it('ignore is not correct', async () => {
    const controller: Controller = new Controller();
    const repo: MuseumRepository = new MuseumRepository();
    // const getVisitorsData = sinon.fake.returns(42);
    const epoch: number = 1404198000000;
    const ignore: string | undefined = "avila_adobe1";
    const res: VisitorsResponseTypes = {
      "attendance": {
        "month": "Jul",
        "year": "2014",
        "highest": {
          "museum": "avila_adobe",
          "visitors": 32378
        },
        "lowest": {
          "museum": "hellman_quon",
          "visitors": 120
        },
        "total": 60535,
        "ignored": {
          "museum": "avila_adobe1",
          "visitors": null
        }
      }
    };

    stub=sinon.stub(MuseumRepository.prototype, 'getMuseumsData').callsFake(stubServicegetVisitorsData);
    const museumService: MuseumService = new MuseumService();
    const result = await museumService.getVisitorsData(epoch , ignore);
    
    expect(JSON.stringify(result)).to.equal(JSON.stringify(res));
    stub.restore();
  });

  it('Controller getVisitorsData function success case without ignore without mocking repo', async () => {
    const controller: Controller = new Controller();
    const repo: MuseumRepository = new MuseumRepository();
    // const getVisitorsData = sinon.fake.returns(42);
    const epoch: number = 1404198000000;
    const ignore: string | undefined = undefined;
    const res: VisitorsResponseTypes = {
      "attendance": {
        "month": "Jul",
        "year": "2014",
        "highest": {
          "museum": "avila_adobe",
          "visitors": 32378
        },
        "lowest": {
          "museum": "hellman_quon",
          "visitors": 120
        },
        "total": 60535
      }
    };

    // stub= sinon.stub(MuseumRepository.prototype, 'getMuseumsData').callsFake(stubServicegetVisitorsData);
    const museumService: MuseumService = new MuseumService();
    const result = await museumService.getVisitorsData(epoch, ignore);
    expect(JSON.stringify(result)).to.equal(JSON.stringify(res));
    // stub.restore();
  });

  it('Error - date is not present in query params', async () => {
    const controller: Controller = new Controller();
    const repo: MuseumRepository = new MuseumRepository();
    // const getVisitorsData = sinon.fake.returns(42);
    const epoch: number = 1404198000000;
    const ignore: string | undefined = "avila_adobe1";
    const err: string = "date is required in query params";
    const res = {
      "name": "date is required in query params"
    };


    stub=sinon.stub(MuseumService.prototype, 'getVisitorsData').throws(err);
    const museumService: MuseumService = new MuseumService();
    try {
      const result = await museumService.getVisitorsData(epoch, ignore);
    } catch(err) {
      expect(JSON.stringify(err)).to.equal(JSON.stringify(res));
    }
    stub.restore();
  });


  it('error from repository', async () => {
    const controller: Controller = new Controller();
    const repo: MuseumRepository = new MuseumRepository();
    // const getVisitorsData = sinon.fake.returns(42);
    const epoch: number = 1404198000000;
    const ignore: string | undefined = undefined;
    const res = {
      "name": "Error While Fetching data from api"
    }

    stub= sinon.stub(MuseumRepository.prototype, 'getMuseumsData').throws('Error While Fetching data from api');
    const museumService: MuseumService = new MuseumService();
    try {
      const result = await museumService.getVisitorsData(epoch, ignore);
    } catch(err) {
      expect(JSON.stringify(err)).to.equal(JSON.stringify(res));
    }
    stub.restore();
  });
});