import { Component, ViewChild, ElementRef } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
  public objectKeys = Object.keys;
    @ViewChild('fileUpload') fileUploadEl: ElementRef;
    fName = '';
    contents: any;
    name = '';

    public fileChanged(event?: UIEvent): void {
      const files: FileList = this.fileUploadEl.nativeElement.files;
      const file = files[0];
      const reader = new FileReader();
      const loaded = (el) => {
        const data = JSON.parse(el.target.result);
        var dataList = Object.keys(data).map(key => data[key]);
        var tempData = dataList.map(d => Object.keys(d).map(key => d[key]))

            var contents = {};
            if (tempData && tempData.length) {
                var firstData = tempData[0];

                firstData.forEach((content, ind) => {
                    var resultData = {};
                    tempData.forEach((content, index) => resultData[index] = content[ind]);
                    contents[ind] = resultData;
                })
            }
        this.contents = contents;
      }
      reader.onload = loaded;
      reader.readAsText(file, 'UTF-8');
      this.name = file.name;
    }
  }