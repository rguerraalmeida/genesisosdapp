//import GoogleSheetsApi from 'g-sheets-api';
//import DropboxInfo from '../artifacts/dropbox-info';
//import XLSX from 'xlsx';
//import { Dropbox } from 'dropbox';
// import axios from 'axios';
import React from 'react';

class DinosRepository extends React.Component{

    componentDidMount() {

      const  url = 'https://www.dropbox.com/s/v4dn5tbtr21pnk6/arkexport.xlsx?dl=1';
      fetch(url, { method: 'GET', redirect: 'follow'})
        .then(response => {
            // HTTP 301 response
            console.log(response);
        })
        .catch(function(err) {
            console.info(err + " url: " + url);
        });

      }
        // axios.get('https://www.dropbox.com/s/v4dn5tbtr21pnk6/arkexport.xlsx?dl=1')
        //   .then(res => {
        //     const persons = res.data;
        //     this.setState({ persons });
        //   })

    render() {
        return   <div className='cenas'>Rui</div>;
      }
}
export default DinosRepository;

//  const DinoSheetService = (sheetName) => {



//     // const Http = new XMLHttpRequest();
//     // const url='https://www.dropbox.com/s/v4dn5tbtr21pnk6/arkexport.xlsx?dl=1';

//     // Http.open("POST", url);
//     // Http.send();
    
//     // Http.onreadystatechange = (e) => {
//     //   console.log(Http.responseType);
//     // }

//     // const xhttp = new XMLHttpRequest();
//     // const url = 'https://www.dropbox.com/s/v4dn5tbtr21pnk6/arkexport.xlsx?dl=1';
//     // xhttp.onreadystatechange = function() {
//     //     if (this.readyState == 4 && this.status == 200) {
//     //        // Typical action to be performed when the document is ready:
//     //        document.getElementById("demo").innerHTML = xhttp.responseText;
//     //     }
//     //     else
//     //     {
//     //         console.info("Error downloading XLSX file");
//     //     }
//     // };

//     // xhttp.open("GET", url);
//     // xhttp.send(); 

//     // // Where we're fetching data from
//     // //https://www.dropbox.com/s/v4dn5tbtr21pnk6/arkexport.xlsx?dl=1
//     // fetch(' https://www.dropbox.com/s/dl/v4dn5tbtr21pnk6/arkexport.xlsx', {
//     //      method: 'GET', 
//     //     //  mode: 'cors', // no-cors, *cors, same-origin
//     //      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//     //     //  credentials: 'same-origin', // include, *same-origin, omit
//     //     //  headers: {
//     //     //    'Content-Type': 'application/octet-stream'
//     //     //    // 'Content-Type': 'application/x-www-form-urlencoded',
//     //     //  },
//     //     //  redirect: 'follow', // manual, *follow, error
//     //     //  referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//     // })
    
//     // // We get the API response and receive data in JSON format...
//     // .then(response => {
//     //     debugger
//     //     var wb = XLSX.read(response.blob, {type: 'binary'});

//     //     /* grab first sheet */
//     //     var wsname = wb.SheetNames[0];
//     //     var ws = wb.Sheets[wsname];
//     //     let sheetZero = XLSX.utils.sheet_to_json(wb.Sheets[ws]);
        
//     //     console.info(JSON.stringify(sheetZero));
//     //     return sheetZero;
  
//     //     // let dinoData = [wb.SheetNames.length-1];
//     //     // wb.SheetNames.forEach(function(ws, i) {
// 	// 	// 	it('#' + i + ' (' + ws + ')', function() {
//     //     //         dinoData[ws.sheetName] =   X.utils.sheet_to_json(wb.Sheets[ws]);
// 	// 	// 	});
// 	// 	// });
              



//     // })
//     // // // // ...then we update the users state
//     // // // .then(data =>
//     // // //     this.setState({
//     // // //     users: data,
//     // // //     isLoading: false,
//     // // //     })
//     // // // )
//     // // // // Catch any errors we hit and update the app
//     // // // // .catch(error => this.setState({ error, isLoading: false }));
//     // .catch(error => console.log(error));

   

//     return [
//         {"class": "Abberant Otter", "name": "", "tribeName": "Wanderers", "location": {"lat":"31,679525390625", "long":"31,262171875", "status":"Cryopod"}},
//         {"class": "Abberant Otter", "name": "xpto", "tribeName": "Wanderers", "location": {"lat":"31,679525390625", "long":"31,262171875", "status":"Cryopod"}},
//         {"class": "Abberant Dire Bear", "name": "Annelise", "tribeName": "", "location": {"lat":"31,679525390625", "long":"31,262171875", "status":"Cryopod"}},
//         {"class": "Abberant Otter", "name": "BEAR", "tribeName": "Wanderers", "location": {"lat":"31,679525390625", "long":"31,262171875", "status":"Cryopod"}},
//         {"class": "Rex", "name": "FUCKIN WIZARD", "tribeName": "Wanderers", "location": {"lat":"31,679525390625", "long":"31,262171875", "status":"Deployed"}},
//         {"class": "Stego", "name": "TOP Tier Lad", "tribeName": "Wanderers", "location": {"lat":"31,679525390625", "long":"31,262171875", "status":"Cryopod"}}
//     ];
// };

// export default DinoSheetService;