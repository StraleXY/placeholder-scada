import { Component } from '@angular/core';
import { AlarmType, TrendingState } from 'src/app/dto/InputDTOs';

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
                Id: 1,
                Description: "Outside Temp",
                Address: 1,
                ScanTime: 500,
                LowLimit: 10,
                HighLimit: 50,
                Units: "C",
                Alarms: [
                    {
                        Id: 0,
                        Type: AlarmType.LOW,
                        Priority: 1,
                        TagId: 1,
                        Threshold: 24
                    },
                    {
                        Id: 1,
                        Type: AlarmType.HIGH,
                        Priority: 2,
                        TagId: 1,
                        Threshold: 28
                    },
                    {
                        Id: 2,
                        Type: AlarmType.HIGH,
                        Priority: 3,
                        TagId: 1,
                        Threshold: 30
                    }
                ],
                Function: "sin",
                IsOn: true,
                CurrentValue: 36.7,
                ReadTime: "17:24 30s 440ms"
            }
            
            
            
            ,{
                Id: 0,
                Description: "Room Temp",
                Address: 2,
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
                        Id: 1,
                        Type: AlarmType.HIGH,
                        Priority: 1,
                        TagId: 0,
                        Threshold: 28
                    },
                    {
                        Id: 2,
                        Type: AlarmType.HIGH,
                        Priority: 3,
                        TagId: 0,
                        Threshold: 32
                    }
                ],
                Function: "sin",
                IsOn: true,
                CurrentValue: 24.3,
                ReadTime: "17:24 30s 340ms"
            },
            {
                Id: 1,
                Description: "Outside Temp",
                Address: 3,
                ScanTime: 500,
                LowLimit: 10,
                HighLimit: 50,
                Units: "C",
                Alarms: [
                    {
                        Id: 0,
                        Type: AlarmType.LOW,
                        Priority: 1,
                        TagId: 1,
                        Threshold: 24
                    },
                    {
                        Id: 1,
                        Type: AlarmType.HIGH,
                        Priority: 2,
                        TagId: 1,
                        Threshold: 28
                    },
                    {
                        Id: 2,
                        Type: AlarmType.HIGH,
                        Priority: 3,
                        TagId: 1,
                        Threshold: 30
                    }
                ],
                Function: "sin",
                IsOn: true,
                CurrentValue: 36.7,
                ReadTime: "17:24 30s 440ms"
            },{
                Id: 0,
                Description: "Room Temp",
                Address: 4,
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
                        Id: 1,
                        Type: AlarmType.HIGH,
                        Priority: 1,
                        TagId: 0,
                        Threshold: 28
                    },
                    {
                        Id: 2,
                        Type: AlarmType.HIGH,
                        Priority: 3,
                        TagId: 0,
                        Threshold: 32
                    }
                ],
                Function: "sin",
                IsOn: true,
                CurrentValue: 24.3,
                ReadTime: "17:24 30s 340ms"
            },
            {
                Id: 1,
                Description: "Outside Temp",
                Address: 5,
                ScanTime: 500,
                LowLimit: 10,
                HighLimit: 50,
                Units: "C",
                Alarms: [
                    {
                        Id: 0,
                        Type: AlarmType.LOW,
                        Priority: 1,
                        TagId: 1,
                        Threshold: 24
                    },
                    {
                        Id: 1,
                        Type: AlarmType.HIGH,
                        Priority: 2,
                        TagId: 1,
                        Threshold: 28
                    },
                    {
                        Id: 2,
                        Type: AlarmType.HIGH,
                        Priority: 3,
                        TagId: 1,
                        Threshold: 30
                    }
                ],
                Function: "sin",
                IsOn: true,
                CurrentValue: 36.7,
                ReadTime: "17:24 30s 440ms"
            },{
                Id: 0,
                Description: "Room Temp",
                Address: 6,
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
                        Id: 1,
                        Type: AlarmType.HIGH,
                        Priority: 1,
                        TagId: 0,
                        Threshold: 28
                    },
                    {
                        Id: 2,
                        Type: AlarmType.HIGH,
                        Priority: 3,
                        TagId: 0,
                        Threshold: 32
                    }
                ],
                Function: "sin",
                IsOn: true,
                CurrentValue: 24.3,
                ReadTime: "17:24 30s 340ms"
            },
            {
                Id: 0,
                Description: "Room Temp",
                Address: 8,
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
                        Id: 1,
                        Type: AlarmType.HIGH,
                        Priority: 1,
                        TagId: 0,
                        Threshold: 28
                    },
                    {
                        Id: 2,
                        Type: AlarmType.HIGH,
                        Priority: 3,
                        TagId: 0,
                        Threshold: 32
                    }
                ],
                Function: "sin",
                IsOn: true,
                CurrentValue: 24.3,
                ReadTime: "17:24 30s 340ms"
            },
            {
                Id: 1,
                Description: "Outside Temp",
                Address: 9,
                ScanTime: 500,
                LowLimit: 10,
                HighLimit: 50,
                Units: "C",
                Alarms: [
                    {
                        Id: 0,
                        Type: AlarmType.LOW,
                        Priority: 1,
                        TagId: 1,
                        Threshold: 24
                    },
                    {
                        Id: 1,
                        Type: AlarmType.HIGH,
                        Priority: 2,
                        TagId: 1,
                        Threshold: 28
                    },
                    {
                        Id: 2,
                        Type: AlarmType.HIGH,
                        Priority: 3,
                        TagId: 1,
                        Threshold: 30
                    }
                ],
                Function: "sin",
                IsOn: true,
                CurrentValue: 36.7,
                ReadTime: "17:24 30s 440ms"
            },{
                Id: 0,
                Description: "Room Temp",
                Address: 10,
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
                        Id: 1,
                        Type: AlarmType.HIGH,
                        Priority: 1,
                        TagId: 0,
                        Threshold: 28
                    },
                    {
                        Id: 2,
                        Type: AlarmType.HIGH,
                        Priority: 3,
                        TagId: 0,
                        Threshold: 32
                    },
                    {
                        Id: 1,
                        Type: AlarmType.HIGH,
                        Priority: 2,
                        TagId: 1,
                        Threshold: 28
                    },
                    {
                        Id: 2,
                        Type: AlarmType.HIGH,
                        Priority: 3,
                        TagId: 1,
                        Threshold: 30
                    }
                ],
                Function: "sin",
                IsOn: true,
                CurrentValue: 24.3,
                ReadTime: "17:24 30s 340ms"
            },
            {
                Id: 1,
                Description: "Outside Temp",
                Address: 12,
                ScanTime: 500,
                LowLimit: 10,
                HighLimit: 50,
                Units: "C",
                Alarms: [
                    {
                        Id: 0,
                        Type: AlarmType.LOW,
                        Priority: 1,
                        TagId: 1,
                        Threshold: 24
                    },
                    {
                        Id: 1,
                        Type: AlarmType.HIGH,
                        Priority: 2,
                        TagId: 1,
                        Threshold: 28
                    },
                    {
                        Id: 2,
                        Type: AlarmType.HIGH,
                        Priority: 3,
                        TagId: 1,
                        Threshold: 30
                    }
                ],
                Function: "sin",
                IsOn: true,
                CurrentValue: 36.7,
                ReadTime: "17:24 30s 440ms"
            },
            {
                Id: 1,
                Description: "Outside Temp",
                Address: 13,
                ScanTime: 500,
                LowLimit: 10,
                HighLimit: 50,
                Units: "C",
                Alarms: [
                    {
                        Id: 0,
                        Type: AlarmType.LOW,
                        Priority: 1,
                        TagId: 1,
                        Threshold: 24
                    },
                    {
                        Id: 1,
                        Type: AlarmType.HIGH,
                        Priority: 2,
                        TagId: 1,
                        Threshold: 28
                    },
                    {
                        Id: 2,
                        Type: AlarmType.HIGH,
                        Priority: 3,
                        TagId: 1,
                        Threshold: 30
                    }
                ],
                Function: "sin",
                IsOn: true,
                CurrentValue: 36.7,
                ReadTime: "17:24 30s 440ms"
            },
            {
                Id: 1,
                Description: "Outside Temp",
                Address: 16,
                ScanTime: 500,
                LowLimit: 10,
                HighLimit: 50,
                Units: "C",
                Alarms: [
                    {
                        Id: 0,
                        Type: AlarmType.LOW,
                        Priority: 1,
                        TagId: 1,
                        Threshold: 24
                    },
                    {
                        Id: 1,
                        Type: AlarmType.HIGH,
                        Priority: 2,
                        TagId: 1,
                        Threshold: 28
                    },
                    {
                        Id: 2,
                        Type: AlarmType.HIGH,
                        Priority: 3,
                        TagId: 1,
                        Threshold: 30
                    }
                ],
                Function: "sin",
                IsOn: true,
                CurrentValue: 36.7,
                ReadTime: "17:24 30s 440ms"
            }
        ],
        DigitalInputs: [
            {
                Id: 1,
                Description: "Outside Lights",
                Address: 17,
                ScanTime: 500,
                IsOn: true,
                CurrentValue: 1,
                ReadTime: "17:24 30s 440ms"
            },
            {
                Id: 2,
                Description: "Inside Lights",
                Address: 18,
                ScanTime: 500,
                IsOn: true,
                CurrentValue: 0,
                ReadTime: "17:24 30s 440ms"
            },
            {
                Id: 3,
                Description: "Security system made by SEcUrItAS",
                Address: 19,
                ScanTime: 500,
                IsOn: true,
                CurrentValue: 0,
                ReadTime: "17:24 30s 440ms"
            }
        ]
    }
}
