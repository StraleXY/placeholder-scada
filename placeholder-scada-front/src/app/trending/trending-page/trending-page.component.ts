import { Component } from '@angular/core';
import { AlarmType, TrendingState } from 'src/app/dto/InputDTOs';

@Component({
  selector: 'app-trending-page',
  templateUrl: './trending-page.component.html',
  styleUrls: ['./trending-page.component.css']
})
export class TrendingPageComponent {


    constructor() {
        setInterval(function(){ 
            
            // TODO - Populate the list with values

        }, 100);
    }

    items: TrendingState = {analogInputs: [], digitalInputs: []}
    
}
