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
        this.selectedInput = input
        this.name = input["Description"]
        this.scanTime = input["ScanTime"]
        this.address = input["Address"]
        this.unitsFrom = input["LowLimit"] != undefined ? input["LowLimit"] : ""
        this.unitsTo = input["HighLimit"] != undefined ? input["HighLimit"] : ""
        this.unit = input["Units"] != undefined ? input["Units"] : ""
        this.alarms = input["Alarms"] != undefined ? input["Alarms"] : []
        this.func = input["Function"] != undefined ? input["Function"] : ""
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
        // TODO Backend call
        this.clearAlarmForm()
    }
    deleteAlarm(alarm: Alarm) {
        this.alarms.splice(this.alarms.indexOf(alarm), 1)
        // TODO Backend call
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
                this.items.analogInputs.push(res)
                this.alarms.forEach((alarm) => {
                    alarm.tagId = res.id
                    // TODO create alarm request
                })
            })
            this.closeForm()
            return
        } else {
            this.items.digitalInputs.push({
                id: 0,
                description: this.name,
                address: Number(this.address),
                scanTime: Number(this.scanTime),
                isOn: true,
                currentValue: 0,
                readTime: '',
                useRtu: false,
            })
            this.closeForm()
            return
        }
        // TODO Backend call on each case
    }

    deleteInput() {
        if (this.selectedType == InputType.ANALOG) this.items.analogInputs.splice(this.items.analogInputs.indexOf(this.selectedInput as AnalogInput), 1)
        else this.items.digitalInputs.splice(this.items.digitalInputs.indexOf(this.selectedInput as DigitalInput), 1)
        this.closeForm()
        // TODO Backend call
    }

    items : TrendingState = {analogInputs: [], digitalInputs: []}
}
