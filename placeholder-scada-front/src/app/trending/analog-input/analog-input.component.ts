import { Component, Input } from '@angular/core';
import { AnalogInput } from 'src/app/dto/InputDTOs';

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
        id: 0,
        description: "",
        address: 0,
        scanTime: 0,
        lowLimit: 0,
        highLimit: 0,
        units: "C",
        alarms: [],
        function: "sin",
        isOn: true,
        currentValue: 0,
        readTime: "",
        useRtu: false,
    }
}
