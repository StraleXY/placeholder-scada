import { Component, Input } from '@angular/core';
import { DigitalInput } from 'src/app/dto/dto';

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
        Id: 0,
        Description: "",
        Address: 0,
        ScanTime: 0,
        IsOn: true,
        CurrentValue: 0,
        ReadTime: ""
    }
}
