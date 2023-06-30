import { Component, Input } from '@angular/core';
import { AnalogInput } from 'src/app/dto/InputDTOs';

@Component({
  selector: 'app-analog-input-info',
  templateUrl: './analog-input-info.component.html',
  styleUrls: ['./analog-input-info.component.css']
})
export class AnalogInputInfoComponent {
    
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
