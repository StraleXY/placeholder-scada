import { Component, Input } from '@angular/core';
import { AnalogOutput } from 'src/app/dto/OutputDTOs';

@Component({
  selector: 'app-analog-output-info',
  templateUrl: './analog-output-info.component.html',
  styleUrls: ['./analog-output-info.component.css']
})
export class AnalogOutputInfoComponent {

    @Input() set Item(item: AnalogOutput) {
        this.input = item
    }
    input: AnalogOutput = {
        id: 0,
        description: "Temperatura",
        address: 0,
        initialValue: 0,
        lowLimit: -40,
        highLimit: 90,
        units: "C",
    }
}
