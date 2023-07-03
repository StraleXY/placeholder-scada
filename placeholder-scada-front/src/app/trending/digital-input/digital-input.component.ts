import { Component, Input } from '@angular/core';
import { DigitalInput } from 'src/app/dto/InputDTOs';

@Component({
  selector: 'app-digital-input',
  templateUrl: './digital-input.component.html',
  styleUrls: ['./digital-input.component.css']
})
export class DigitalInputComponent {
    
    @Input() set DigitalInputItem(item: DigitalInput) {
        this.input = item
    }

    input: DigitalInput = {
        id: 0,
        description: "",
        address: 0,
        scanTime: 0,
        isOn: true,
        currentValue: 0,
        readTime: "",
        useRtu: false,
    }
}
