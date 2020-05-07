import GoogleSheetsApi from 'g-sheets-api';
import Dropbox from 'dropbox/dropbox';

 const DinoSheetService = (sheetName) => {
    // console.log('DinoSheetService called');


    https://www.dropbox.com/oauth2/authorize?client_id=<APP_KEY>&response_type=code

    const options = {
        sheetId: '1-CmQumuz5ZiOvINhphEMgfplrJacQhD623RROcOBTAg',
        sheetNumber: 1,
        returnAllResults: false,
        filter: {
          'department': 'archaeology',
          'module description': 'introduction'
        },
        filterOptions: {
          operator: 'or',
          matching: 'loose'
        }
      }

    // GSheetReader(options, results => {
    //     // do something with the results here
    //   });



    return [
        {"class": "Abberant Otter", "name": "", "tribeName": "Wanderers", "location": {"lat":"31,679525390625", "long":"31,262171875", "status":"Cryopod"}},
        {"class": "Abberant Otter", "name": "xpto", "tribeName": "Wanderers", "location": {"lat":"31,679525390625", "long":"31,262171875", "status":"Cryopod"}},
        {"class": "Abberant Dire Bear", "name": "Annelise", "tribeName": "", "location": {"lat":"31,679525390625", "long":"31,262171875", "status":"Cryopod"}},
        {"class": "Abberant Otter", "name": "BEAR", "tribeName": "Wanderers", "location": {"lat":"31,679525390625", "long":"31,262171875", "status":"Cryopod"}},
        {"class": "Rex", "name": "FUCKIN WIZARD", "tribeName": "Wanderers", "location": {"lat":"31,679525390625", "long":"31,262171875", "status":"Deployed"}},
        {"class": "Stego", "name": "TOP Tier Lad", "tribeName": "Wanderers", "location": {"lat":"31,679525390625", "long":"31,262171875", "status":"Cryopod"}}
    ];
};

export default DinoSheetService;