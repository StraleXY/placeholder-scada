import { Component } from '@angular/core';
import { Alarm, AlarmType, AnalogInput, DigitalInput, InputType, TrendingState } from 'src/app/dto/InputDTOs';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-admin-inputs',
  templateUrl: './admin-inputs.component.html',
  styleUrls: ['./admin-inputs.component.css']
})
export class AdminInputsComponent {

    constructor(private tagService: TagService) {
        this.tagService.getAnalogInputs().subscribe((res) => {
            console.log(res)
            this.items.analogInputs = res
            this.generateAddresses()
        })
        this.tagService.getDigitalInputs().subscribe((res) => {
            console.log(res)
            this.items.digitalInputs = res
            this.generateAddresses()
        })
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
    func: string = ""
    alarms: Alarm[] = []

    addresses: { label: string, value: any }[] = []
    functions: { label: string, value: string }[] = [
        { label: "Sinus Function", value: "sin" },
        { label: "Cosinus Function", value: "cos" },
        { label: "Ramp Function", value: "ramp" }
    ]

    generateAddresses() {
        this.addresses = []
        let takenAddresses: number[] = []
        this.items.analogInputs.forEach((input) => {
            takenAddresses.push(input.address)
        })
        this.items.digitalInputs.forEach((input) => {
            takenAddresses.push(input.address)
        })
        for(let i = 1; i <= 20; i++) {
            if(takenAddresses.indexOf(i) == -1) 
                this.addresses.push({ label: "Address " + i, value: i })
        }
    }
    toggleAdd() {
        this.isPreview = !this.isPreview
        this.selectedInput = undefined
        this.clearForm()
    }
    toggleEdit(input: any) {
        console.log(input);
        this.selectedInput = input
        this.name = input["description"]
        this.scanTime = input["scanTime"]
        this.address = input["address"]
        this.unitsFrom = input["lowLimit"] != undefined ? input["lowLimit"] : ""
        this.unitsTo = input["highLimit"] != undefined ? input["highLimit"] : ""
        this.unit = input["units"] != undefined ? input["units"] : ""
        this.alarms = input["alarms"] != undefined ? input["alarms"] : []
        this.func = input["function"] != undefined ? input["function"] : ""
        this.addresses.push({label: "Address " + this.address, value: this.address})
        this.addresses.sort((a, b) => {
            if(Number(a.value) == Number(b.value)) return 0
            else if (Number(a.value) > Number(b.value)) return 1
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
            id: 0,
            type: this.selectedAlarmType,
            priority: this.selectedAlarmPriority,
            tagId: this.selectedInput != undefined ? this.selectedInput["id"] : 0,
            threshold: Number(this.threshold)
        })
        let alarm: Alarm = this.alarms[this.alarms.length-1]
        if (this.selectedInput != undefined) {
            this.tagService.createAlarm({
                type: alarm.type == AlarmType.LOW ? 0 : 1,
                priority: alarm.priority,
                tagId: alarm.tagId,
                threshold: alarm.threshold
            }).subscribe((res) => console.log(res))
        }
        this.clearAlarmForm()
    }
    deleteAlarm(alarm: Alarm) {
        this.alarms.splice(this.alarms.indexOf(alarm), 1)
        if (this.selectedInput != undefined) {
            this.tagService.deleteAlarm(alarm.id).subscribe((res) => console.log(res))
        }
    }

    saveInput() {
        if (this.selectedInput != undefined) {
            this.selectedInput.description = this.name
            this.selectedInput.address = Number(this.address)
            this.selectedInput.scanTime = Number(this.scanTime)
            if ((this.selectedInput as AnalogInput).lowLimit != undefined) {
                (this.selectedInput as AnalogInput).lowLimit = Number(this.unitsFrom);
                (this.selectedInput as AnalogInput).highLimit = Number(this.unitsTo);
                (this.selectedInput as AnalogInput).units = this.unit;
                (this.selectedInput as AnalogInput).alarms = this.alarms;
                (this.selectedInput as AnalogInput).function = this.func
            }
            if ((this.selectedInput as AnalogInput).lowLimit != undefined){
                this.tagService.updateAnalogInput({
                    description: this.selectedInput.description,
                    address: this.selectedInput.address,
                    scanTime: this.selectedInput.scanTime,
                    function: (this.selectedInput as AnalogInput).function,
                    lowLimit: (this.selectedInput as AnalogInput).lowLimit,
                    highLimit: (this.selectedInput as AnalogInput).highLimit,
                    units: (this.selectedInput as AnalogInput).units
                }, this.selectedInput.id).subscribe((res) => {
                    console.log(res)
                })
            }
            else {
                this.tagService.updateDigitalInput({
                    description: this.selectedInput.description,
                    address: this.selectedInput.address,
                    scanTime: this.selectedInput.scanTime,
                }, this.selectedInput.id).subscribe((res) => {
                    console.log(res)
                })
            }
            this.closeForm()
            return
        }
        if (this.selectedType == InputType.ANALOG) {
            this.tagService.createAnalogInput({
                description: this.name,
                address: Number(this.address),
                scanTime: Number(this.scanTime),
                function: this.func,
                lowLimit: Number(this.unitsFrom),
                highLimit: Number(this.unitsTo),
                units: this.unit
            }).subscribe((res) => {
                console.log(res)
                this.alarms.forEach((alarm) => {
                    alarm.tagId = res.id
                })
                res.alarms = this.alarms
                //this.clearForm()
                this.items.analogInputs.push(res)
                res.alarms.forEach((alarm) => {
                    this.tagService.createAlarm({
                        type: alarm.type == AlarmType.LOW ? 0 : 1,
                        priority: alarm.priority,
                        tagId: alarm.tagId,
                        threshold: alarm.threshold
                    }).subscribe((res2) => console.log(res2))
                })
            })
            return
        } else {
            this.tagService.createDigitalInput({
                description: this.name,
                address: Number(this.address),
                scanTime: Number(this.scanTime),
            }).subscribe((res) => {
                console.log(res)
                this.items.digitalInputs.push(res)
            })
            this.closeForm()
            return
        }
    }

    deleteInput() {
        if (this.selectedType == InputType.ANALOG){
            this.tagService.deleteAnalogInput((this.selectedInput as AnalogInput).id).subscribe((res) => console.log(res))
            this.items.analogInputs.splice(this.items.analogInputs.indexOf(this.selectedInput as AnalogInput), 1)
        }
        else {
            this.tagService.deleteDigitalInput((this.selectedInput as DigitalInput).id).subscribe((res) => console.log(res))
            this.items.digitalInputs.splice(this.items.digitalInputs.indexOf(this.selectedInput as DigitalInput), 1)
        }
        this.closeForm()
    }

    items : TrendingState = {analogInputs: [], digitalInputs: []}
}
