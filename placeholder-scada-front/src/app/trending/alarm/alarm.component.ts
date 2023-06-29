import { Component, Input } from '@angular/core';
import { Alarm, AlarmType } from 'src/app/dto/dto';

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.css']
})
export class AlarmComponent {
    @Input() alarm: Alarm = {
        Id: 0,
        Type: AlarmType.LOW,
        Priority: 1,
        TagId: 0,
        Threshold: 0
    }
    @Input() set value(value: number | undefined) {
        if(value == undefined) {
            this.isActive = false
            return
        }
        if(
            (this.alarm.Type == AlarmType.LOW && this.alarm.Threshold > value) ||
            (this.alarm.Type == AlarmType.HIGH && this.alarm.Threshold < value)
        ) this.isActive = true 
        else this.isActive = false
    }
    isActive: boolean = false
}
