import { Component } from '@angular/core';
import { AlarmType, AnalogInput, DigitalInput, InputType, TrendingState } from 'src/app/dto/dto';

@Component({
  selector: 'app-admin-inputs',
  templateUrl: './admin-inputs.component.html',
  styleUrls: ['./admin-inputs.component.css']
})
export class AdminInputsComponent {

    constructor() {
        this.generateAddresses()
    }

    isPreview: boolean = true
    selectedType: InputType = InputType.ANALOG
    selectedInput: AnalogInput | DigitalInput | undefined = undefined

    // FoRm ;)
    name: string = ""
    scanTime: string = ""
    unitsFrom: string = ""
    unitsTo: string = ""
    unit: string = ""

    addresses: number[] = []

    generateAddresses() {
        let takenAddresses: number[] = []
        this.items.AnalogInputs.forEach((input) => {
            takenAddresses.push(input.Address)
        })
        this.items.DigitalInputs.forEach((input) => {
            takenAddresses.push(input.Address)
        })
        for(let i = 0; i < 20; i++) {
            if(takenAddresses.indexOf(i) == -1) 
                this.addresses.push(i)
        }
        console.log(this.addresses);
    }
    toggleAddEdit() {
        this.isPreview = !this.isPreview
        this.selectedInput = undefined
        this.clearForm()
    }
    toggleType(type: number) {
        this.selectedType = type
    }
    selectInput(input: any) {
        this.selectedInput = input

        this.name = input["Description"]
        this.scanTime = input["ScanTime"]
        this.unitsFrom = input["LowLimit"] != undefined ? input["LowLimit"] : ""
        this.unitsTo = input["HighLimit"] != undefined ? input["HighLimit"] : ""
        this.unit = input["Units"] != undefined ? input["Units"] : ""

        this.isPreview = false
        console.log(this.scanTime);
        console.log(input["LowLimit"]);
        console.log(input["HighLimit"]);
    
    }
    clearForm() {
        this.name = ""
        this.scanTime = ""
        this.unitsFrom = ""
        this.unitsTo = ""
        this.unit = ""
    }

    items: TrendingState = {
        AnalogInputs: [
            {
                Id: 0,
                Description: "Room Temp jkdashf kajdfh",
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
