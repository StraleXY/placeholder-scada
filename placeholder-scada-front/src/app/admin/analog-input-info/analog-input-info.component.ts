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
        id: 0,
        description: "",
        address: 0,
        scanTime: 0,
        lowLimit: 0,
        highLimit: 0,
        units: "C",
        alarms: [],
        isOn: true,
        currentValue: 0,
        function: "sin",
        readTime: "",
        useRtu: false,
    }
}
