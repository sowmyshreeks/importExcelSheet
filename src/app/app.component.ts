import { Component } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  Object = Object;
  willDownload = false;
  output:any;
  data:any;
  _k:any;
  dataString: any;
  columnsArr: any[];

  public keyArray: Array<any> = [];
  value: any;
  item: any;
  emtKey: string;

  constructor() { }

  onFileChange(ev) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      this.columnsArr = [];
      this.data = Object.keys(jsonData).map(key=>jsonData[key])
      console.log(this.data);
      this.data.forEach((elm, index) => {
        this.item = elm;
        for (var firstKey in this.item[0]) break;
          this.emtKey = firstKey;
      });
     
      // this.output = dataString.slice(0, 300);
      // this.setDownload(dataString);
    }
    reader.readAsBinaryString(file);
  }


  setDownload(data) {
    this.willDownload = true;
    setTimeout(() => {
      const el = document.querySelector("#download");
      el.setAttribute("href", `data:text/json;charset=utf-8,${encodeURIComponent(data)}`);
      el.setAttribute("download", 'xlsxtojson.json');
    }, 1000)
  }



}


// var arr = [ [ { "eid": "e101", "ename": "ravi", "esal": 1000 }, { "eid": "e102", "ename": "ram", "esal": 2000 }, { "eid": "e103", "ename": "rajesh", "esal": 3000 } ], [ { "name": "asd", "id": 23, "address": "asd" }, { "name": "wer", "id": 34, "address": "jjkk" }, { "name": "qwer", "id": 90, "address": "oipp" } ] ]
// var keyarr = [];

// for(i=0; i<arr.length; i++){

// for(j=0; j<arr[i].length; j++){

// for (var key in arr[i][j]) {
//       if (arr[i][j].hasOwnProperty(key)) {
//         keyarr.push(key);
//       }
//     }
// }

// }
// for(k=0; k<keyarr.length; k++){
// if(){

// }
// }

// console.log(keyarr);