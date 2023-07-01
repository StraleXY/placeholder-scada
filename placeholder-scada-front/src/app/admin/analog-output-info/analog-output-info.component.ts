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
        Id: 0,
        Description: "Temperatura",
        Address: 0,
        InitialValue: 0,
        LowLimit: -40,
        HighLimit: 90,
        Units: "C",
    }
}
