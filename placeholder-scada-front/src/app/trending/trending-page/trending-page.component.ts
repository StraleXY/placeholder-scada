import { Component } from '@angular/core';
import { AlarmType, TrendingState } from 'src/app/dto/InputDTOs';

@Component({
  selector: 'app-trending-page',
  templateUrl: './trending-page.component.html',
  styleUrls: ['./trending-page.component.css']
})
export class TrendingPageComponent {

    // TODO - Populate the list with values

    items: TrendingState = {AnalogInputs: [], DigitalInputs: []}
    
}
