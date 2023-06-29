import { Component, Input } from '@angular/core';
import { AnalogInput } from 'src/app/dto/dto';

@Component({
  selector: 'app-analog-input',
  templateUrl: './analog-input.component.html',
  styleUrls: ['./analog-input.component.css']
})
export class AnalogInputComponent {

    @Input() set AnalogInputItem(item: AnalogInput) {
        this.input = item
    }

    input: AnalogInput = {
        Id: 0,
        Description: "",
        Address: 0,
        ScanTime: 0,
        LowLimit: 0,
        HighLimit: 0,
        Units: "C",
        Alarms: [],
        IsOn: true,
        CurrentValue: 0,
        ReadTime: ""
    }
}
