import { Component } from '@angular/core';
import { Alarm, AlarmType, AnalogInput, DigitalInput, InputType, TrendingState } from 'src/app/dto/dto';

@Component({
  selector: 'app-admin-inputs',
  templateUrl: './admin-inputs.component.html',
  styleUrls: ['./admin-inputs.component.css']
})
export class AdminInputsComponent {

    constructor() {
        this.generateAddresses()
        // TODO Backend call to get all inputs [Same state dto as in worker front]
    }

    isPreview: boolean = true
    selectedType: InputType = InputType.ANALOG
    selectedInput: AnalogInput | DigitalInput | undefined = undefined

    // Input FoRm ;)
    name: string = ""
    scanTime: string = ""
    unitsFrom: string = ""
    unitsTo: string = ""
    unit: string = ""
    address: string = ""
    alarms: Alarm[] = []

    addresses: number[] = []

    generateAddresses() {
        this.addresses = []
        let takenAddresses: number[] = []
        this.items.AnalogInputs.forEach((input) => {
            takenAddresses.push(input.Address)
        })
        this.items.DigitalInputs.forEach((input) => {
            takenAddresses.push(input.Address)
        })
        for(let i = 1; i <= 20; i++) {
            if(takenAddresses.indexOf(i) == -1) 
                this.addresses.push(i)
        }
    }
    toggleType(type: number) {
        this.selectedType = type
    }
    toggleAdd() {
        this.isPreview = !this.isPreview
        this.selectedInput = undefined
        this.clearForm()
    }
    toggleEdit(input: any) {
        this.selectedInput = input
        this.name = input["Description"]
        this.scanTime = input["ScanTime"]
        this.address = input["Address"]
        this.unitsFrom = input["LowLimit"] != undefined ? input["LowLimit"] : ""
        this.unitsTo = input["HighLimit"] != undefined ? input["HighLimit"] : ""
        this.unit = input["Units"] != undefined ? input["Units"] : ""
        this.alarms = input["Alarms"] != undefined ? input["Alarms"] : []
        this.addresses.push(Number(this.address))
        this.addresses.sort((a, b) => {
            if(Number(a) == Number(b)) return 0
            else if (Number(a) > Number(b)) return 1
            else return -1
        })

        this.isPreview = false
    }
    closeForm() {
        this.isPreview = true
        this.selectedInput = undefined
        this.clearForm()
    }
    addressSelected(value: number) {
        this.address = value.toString()
    }
    clearForm() {
        this.name = ""
        this.address = ""
        this.scanTime = ""
        this.unitsFrom = ""
        this.unitsTo = ""
        this.unit = ""
        this.alarms = []
        this.clearAlarmForm()
        this.generateAddresses()
    }

    // Alarm form :)
    threshold: string = ""
    selectedAlarmType: AlarmType = AlarmType.LOW 
    selectedAlarmPriority: number = 1

    clearAlarmForm() {
        this.threshold = "",
        this.selectedAlarmType = AlarmType.LOW
        this.selectedAlarmPriority = 1
    }
    addAlarm() {
        this.alarms.push({
            Id: 0,
            Type: this.selectedAlarmType,
            Priority: this.selectedAlarmPriority,
            TagId: this.selectedInput != undefined ? this.selectedInput["Id"] : 0,
            Threshold: Number(this.threshold)
        })
        // TODO Backend call
        this.clearAlarmForm()
    }
    deleteAlarm(alarm: Alarm) {
        this.alarms.splice(this.alarms.indexOf(alarm), 1)
        // TODO Backend call
    }

    saveInput() {
        if (this.selectedInput != undefined) {
            this.selectedInput.Description = this.name
            this.selectedInput.Address = Number(this.address)
            this.selectedInput.ScanTime = Number(this.scanTime)
            if ((this.selectedInput as AnalogInput).LowLimit != undefined) {
                (this.selectedInput as AnalogInput).LowLimit = Number(this.unitsFrom);
                (this.selectedInput as AnalogInput).HighLimit = Number(this.unitsTo);
                (this.selectedInput as AnalogInput).Units = this.unit;
                (this.selectedInput as AnalogInput).Alarms = this.alarms;
            }
            this.closeForm()
            return
        }
        if (this.selectedType == InputType.ANALOG) {
            this.items.AnalogInputs.push({
                Id: 0,
                Description: this.name,
                Address: Number(this.address),
                ScanTime: Number(this.scanTime),
                IsOn: true,
                CurrentValue: Number(this.unitsFrom),
                ReadTime: '',
                LowLimit: Number(this.unitsFrom),
                HighLimit: Number(this.unitsTo),
                Units: this.unit,
                Alarms: this.alarms
            })
            this.closeForm()
            return
        } else {
            this.items.DigitalInputs.push({
                Id: 0,
                Description: this.name,
                Address: Number(this.address),
                ScanTime: Number(this.scanTime),
                IsOn: true,
                CurrentValue: 0,
                ReadTime: ''
            })
            this.closeForm()
            return
        }
        // TODO Backend call on each case
    }

    deleteInput() {
        if (this.selectedType == InputType.ANALOG) this.items.AnalogInputs.splice(this.items.AnalogInputs.indexOf(this.selectedInput as AnalogInput), 1)
        else this.items.DigitalInputs.splice(this.items.DigitalInputs.indexOf(this.selectedInput as DigitalInput), 1)
        this.closeForm()
        // TODO Backend call
    }

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
