import { Component, Input } from '@angular/core';
import { DigitalOutput } from 'src/app/dto/OutputDTOs';

@Component({
  selector: 'app-digital-output-info',
  templateUrl: './digital-output-info.component.html',
  styleUrls: ['./digital-output-info.component.css']
})
export class DigitalOutputInfoComponent {
    
    @Input() set Item(item: DigitalOutput) {
        this.input = item
    }
    
    input: DigitalOutput = {
        Id: 0,
        Description: "Not Temperatura",
        Address: 1
    }
}
