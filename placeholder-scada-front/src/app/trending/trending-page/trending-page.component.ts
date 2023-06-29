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
                Units: "kg/m^2",
                Alarms: [
                    {
                        Id: 0,
                        Type: AlarmType.HIGH,
                        Priority: 1,
                        TagId: 0,
                        Threshold: 244
                    },
                    {
                        Id: 1,
                        Type: AlarmType.HIGH,
                        Priority: 1,
                        TagId: 0,
                        Threshold: 2834
                    },
                    {
                        Id: 2,
                        Type: AlarmType.HIGH,
                        Priority: 3,
                        TagId: 0,
                        Threshold: 322342
                    }
                ],
                IsOn: true,
                CurrentValue: 2443.3,
                ReadTime: "17:24 30s 340ms"
            },
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
                IsOn: true,
                CurrentValue: 36.7,
                ReadTime: "17:24 30s 440ms"
            }
            
            
            
            ,{
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
                IsOn: true,
                CurrentValue: 24.3,
                ReadTime: "17:24 30s 340ms"
            },
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
                IsOn: true,
                CurrentValue: 36.7,
                ReadTime: "17:24 30s 440ms"
            },{
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
                IsOn: true,
                CurrentValue: 24.3,
                ReadTime: "17:24 30s 340ms"
            },
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
                IsOn: true,
                CurrentValue: 36.7,
                ReadTime: "17:24 30s 440ms"
            },{
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
                IsOn: true,
                CurrentValue: 24.3,
                ReadTime: "17:24 30s 340ms"
            },
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
                IsOn: true,
                CurrentValue: 36.7,
                ReadTime: "17:24 30s 440ms"
            },{
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
                IsOn: true,
                CurrentValue: 24.3,
                ReadTime: "17:24 30s 340ms"
            },
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
                IsOn: true,
                CurrentValue: 36.7,
                ReadTime: "17:24 30s 440ms"
            },{
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
                IsOn: true,
                CurrentValue: 24.3,
                ReadTime: "17:24 30s 340ms"
            },
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
                IsOn: true,
                CurrentValue: 36.7,
                ReadTime: "17:24 30s 440ms"
            },
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
                IsOn: true,
                CurrentValue: 36.7,
                ReadTime: "17:24 30s 440ms"
            },
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
                IsOn: true,
                CurrentValue: 36.7,
                ReadTime: "17:24 30s 440ms"
            },
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
                IsOn: true,
                CurrentValue: 36.7,
                ReadTime: "17:24 30s 440ms"
            },
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
                IsOn: true,
                CurrentValue: 36.7,
                ReadTime: "17:24 30s 440ms"
            },
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
                IsOn: true,
                CurrentValue: 36.7,
                ReadTime: "17:24 30s 440ms"
            },
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
                IsOn: true,
                CurrentValue: 36.7,
                ReadTime: "17:24 30s 440ms"
            },
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
                IsOn: true,
                CurrentValue: 36.7,
                ReadTime: "17:24 30s 440ms"
            },
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
                IsOn: true,
                CurrentValue: 36.7,
                ReadTime: "17:24 30s 440ms"
            }
        ],
        DigitalInputs: [

        ]
    }
}
