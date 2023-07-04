import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Alarm, AlarmType } from 'src/app/dto/InputDTOs';

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.css']
})
export class AlarmComponent {
    @Input() alarm: Alarm = {
        id: 0,
        type: AlarmType.LOW,
        priority: 1,
        tagId: 0,
        threshold: 0
    }
    @Input() set value(value: number | undefined) {
        if(value == undefined) {
            this.isActive = false
            return
        }
        if(
            (this.alarm.type == AlarmType.LOW && this.alarm.threshold > value) ||
            (this.alarm.type == AlarmType.HIGH && this.alarm.threshold < value)
        ) this.isActive = true 
        else this.isActive = false
    }
    @Output() onClick: EventEmitter<void> = new EventEmitter()

    activeTimeoutId: any = undefined
    click() {
        this.onClick.emit()
        console.log(this.isEnabled);
        
        this.isEnabled = false
        if(this.activeTimeoutId != undefined) clearTimeout(this.activeTimeoutId)
        this.activeTimeoutId = setTimeout(() => {
            this.isEnabled = true
        }, this.alarm.priority == 1 ? 4000 : this.alarm.priority == 2 ? 2500 : 1200);
    }

    isActive: boolean = false
    isEnabled: boolean = true
}
