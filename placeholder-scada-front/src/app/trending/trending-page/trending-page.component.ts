import { Component } from '@angular/core';
import { AlarmType, TrendingState } from 'src/app/dto/InputDTOs';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-trending-page',
  templateUrl: './trending-page.component.html',
  styleUrls: ['./trending-page.component.css']
})
export class TrendingPageComponent {


    constructor(private coreService: CoreService) {
        let that = this
        coreService.startSystem().subscribe(
            (res) => {
                setInterval(function(){ 
                    coreService.getTrendingState().subscribe((res) => {
                        that.updateTrendingState(res['result'] as TrendingState)
                    })
                }, 100);
            },
            (err) => {
                setInterval(function(){ 
                    coreService.getTrendingState().subscribe((res) => {
                        that.updateTrendingState(res['result'] as TrendingState)
                    })
                }, 100);
            }
        )
    }

    updateTrendingState(state: TrendingState) {
        if (this.items.analogInputs.length != state.analogInputs.length) {
            this.items.analogInputs = state.analogInputs
        } else {
            for (let i = 0; i < state.analogInputs.length; i++) {
                this.items.analogInputs[i].currentValue = state.analogInputs[i].currentValue
                this.items.analogInputs[i].readTime = state.analogInputs[i].readTime
                this.items.analogInputs[i].address = state.analogInputs[i].address
                this.items.analogInputs[i].description = state.analogInputs[i].description
                this.items.analogInputs[i].units = state.analogInputs[i].units
                if (this.items.analogInputs[i].alarms.length != state.analogInputs[i].alarms.length) {
                    this.items.analogInputs[i].alarms = state.analogInputs[i].alarms
                } else {
                    for (let j = 0; j < this.items.analogInputs[i].alarms.length; j++) {
                        this.items.analogInputs[i].alarms[j].threshold = state.analogInputs[i].alarms[j].threshold
                        this.items.analogInputs[i].alarms[j].type = state.analogInputs[i].alarms[j].type
                        this.items.analogInputs[i].alarms[j].priority = state.analogInputs[i].alarms[j].priority
                    }
                }
            }
        }
        if (this.items.digitalInputs.length != state.digitalInputs.length) {
            this.items.digitalInputs = state.digitalInputs
        } else {
            for (let i = 0; i < state.digitalInputs.length; i++) {
                this.items.digitalInputs[i].currentValue = state.digitalInputs[i].currentValue
                this.items.digitalInputs[i].readTime = state.digitalInputs[i].readTime
                this.items.digitalInputs[i].address = state.digitalInputs[i].address
                this.items.digitalInputs[i].description = state.digitalInputs[i].description
            }
        }
    }

    items: TrendingState = {analogInputs: [], digitalInputs: []}
    
}
