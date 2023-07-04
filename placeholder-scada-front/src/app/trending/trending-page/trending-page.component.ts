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
                        that.items = res['result']
                    })
                }, 100);
            },
            (err) => {
                setInterval(function(){ 
                    coreService.getTrendingState().subscribe((res) => {
                        that.items = res['result']
                    })
                }, 100);
            }
        )
    }

    items: TrendingState = {analogInputs: [], digitalInputs: []}
    
}
