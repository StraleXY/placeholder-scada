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
        this.items.AnalogInputs.forEach((input) => {
            takenAddresses.push(input.Address)
        })
        this.items.DigitalInputs.forEach((input) => {
            takenAddresses.push(input.Address)
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
                (this.selectedInput as AnalogInput).Function = this.func
            }
            this.closeForm()
            return
        }
        if (this.selectedType == InputType.ANALOG) {
            this.tagService.createAnalogInput({
                Description: this.name,
                Address: Number(this.address),
                ScanTime: Number(this.scanTime),
                Function: this.func,
                LowLimit: Number(this.unitsFrom),
                HighLimit: Number(this.unitsTo),
                Units: this.unit
            }).subscribe((res) => {
                console.log(res)
                this.items.AnalogInputs.push(res)
                this.alarms.forEach((alarm) => {
                    alarm.TagId = res.Id
                    // TODO create alarm request
                })
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
                ReadTime: '',
                UseRtu: false,
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

    items : TrendingState = {AnalogInputs: [], DigitalInputs: []}
}
