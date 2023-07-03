import { Component, Input } from '@angular/core';
import { DigitalInput } from 'src/app/dto/InputDTOs';

@Component({
  selector: 'app-digital-input-info',
  templateUrl: './digital-input-info.component.html',
  styleUrls: ['./digital-input-info.component.css']
})
export class DigitalInputInfoComponent {
    
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
