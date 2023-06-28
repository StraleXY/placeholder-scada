import { Component } from '@angular/core';
import { AlarmType, TrendingState } from 'src/app/dto/dto';

@Component({
  selector: 'app-trending-page',
  templateUrl: './trending-page.component.html',
  styleUrls: ['./trending-page.component.css']
})
export class TrendingPageComponent {

    // TODO - Populate the list with values

    items: TrendingState = {
        AnalogInputs: [
            {
                Id: 0,
                Description: "Room Temp",
                Address: 0,
                ScanTime: 500,
                LowLimit: 10,
                HighLimit: 50,
                Units: "C",
                Alarms: [
                    {
                        Id: 0,
                        Type: AlarmType.HIGH,
                        Priority: 1,
                        TagId: 0,
                        Threshold: 24
                    },
                    {
                        Id: 0,
                        Type: AlarmType.HIGH,
                        Priority: 2,
                        TagId: 0,
                        Threshold: 28
                    },
                    {
                        Id: 0,
                        Type: AlarmType.HIGH,
                        Priority: 3,
                        TagId: 0,
                        Threshold: 32
                    }
                ],
                IsOn: true,
                CurrentValue: 24.3,
                ReadTime: "17h 24m 30s 340ms"
            }
        ],
        DigitalInputs: [

        ]
    }
}
