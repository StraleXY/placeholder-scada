import { Component } from '@angular/core';
import { ReportsService } from 'src/app/reports.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {
  outputs: { label: string, value: number }[] = []
  priorities: { label: string, value: number }[] = []
  selected: number = -1
  priority: number = -1
  tagId: any;
  fromDate: any;
  toDate: any;
  result: any;
  option12: boolean = false;
  option3456: boolean = false;
  checkBox: boolean = false;
  isAnalog: boolean = false;

  constructor(private reportsService: ReportsService) {
    this.outputs = []
      this.outputs.push({ label: "All alarms for a time period", value: 1 })
      this.outputs.push({ label: "Alarms of certain priority", value: 2 })
      this.outputs.push({ label: "Tag values for a time period", value: 3 })
      this.outputs.push({ label: "Last analog input values", value: 4 })
      this.outputs.push({ label: "Last digital input values", value: 5 })
      this.outputs.push({ label: "Values for tag id", value: 6 })

      this.priorities.push({ label: "Low", value: 1 })
      this.priorities.push({ label: "High", value: 2 })
      this.priorities.push({ label: "Critical", value: 3 })
  }

  setOutput(output: any) {
    this.selected = output;
  }

  setPriority(output: any) {
    this.priority = output;
  }

  showReport() {
    if (this.selected == 1) {
      this.option3456 = false;
      let sortBy = this.checkBox ? 1 : 0;
      console.log({"from" : this.fromDate, "to" : this.toDate, "SortBy": sortBy})
      this.reportsService.getAlarmsBetween({"from" : this.fromDate, "to" : this.toDate, "SortBy": sortBy}).subscribe(res => {
        console.log(res)
        this.result = res
        this.option12 = true;
      })
    } else if (this.selected == 2) {
      this.option3456 = false;
      this.reportsService.getAlarmsOfPriority(this.priority).subscribe(res => {
        console.log(res)
        this.result = res
        this.option12 = true;
      })
    } else if (this.selected == 3) {
      this.option12 = false;
      this.reportsService.getValuesInTimeSpan({"from" : this.fromDate, "to" : this.toDate}).subscribe(res => {
        console.log(res)
        this.result = res
        this.option3456 = true;
      })
    } else if (this.selected == 4) {
      this.option12 = false;
      this.reportsService.getValuesAnalog().subscribe(res => {
        console.log(res)
        this.result = res
        this.option3456 = true;
      })
    } else if (this.selected == 5) {
      this.option12 = false;
      this.reportsService.getValuesDigital().subscribe(res => {
        console.log(res)
        this.result = res
        this.option3456 = true;
      })
    } else if (this.selected == 6) {
      this.option12 = false;
      let analog = this.isAnalog ? 1 : 0
      this.reportsService.getAllTagValues(analog, this.tagId).subscribe(res => {
        console.log(res)
        this.result = res
        this.option3456 = true;
      })
    }
  }
}
