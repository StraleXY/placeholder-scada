import { Component } from '@angular/core';
import { InputType } from 'src/app/dto/InputDTOs';
import { AnalogOutput, DigitalOutput } from 'src/app/dto/OutputDTOs';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-admin-outputs',
  templateUrl: './admin-outputs.component.html',
  styleUrls: ['./admin-outputs.component.css']
})
export class AdminOutputsComponent {

    constructor(private tagService: TagService) {
        this.tagService.getAnalogOutputs().subscribe((res) => {
            console.log(res)
            this.analogItems = res
            this.generateAddresses()
        })
        this.tagService.getDigitalOutputs().subscribe((res) => {
            console.log(res)
            this.digitalItems = res
            this.generateAddresses()
        })
    }

    saveOutput() {
        if(this.selectedOutput != undefined) {
            this.selectedOutput.description = this.name
            this.selectedOutput.address = Number(this.address)
            this.selectedOutput.initialValue = Number(this.initalValue)
            if ((this.selectedOutput as AnalogOutput).lowLimit != undefined) {
                (this.selectedOutput as AnalogOutput).lowLimit = Number(this.unitsFrom);
                (this.selectedOutput as AnalogOutput).highLimit = Number(this.unitsTo);
                (this.selectedOutput as AnalogOutput).units = this.unit;
            }
            if ((this.selectedOutput as AnalogOutput).lowLimit != undefined){
                this.tagService.updateAnalogOutput({
                    description: this.selectedOutput.description,
                    address: this.selectedOutput.address,
                    initialValue: this.selectedOutput.initialValue,
                    lowLimit: (this.selectedOutput as AnalogOutput).lowLimit,
                    highLimit: (this.selectedOutput as AnalogOutput).highLimit,
                    units: (this.selectedOutput as AnalogOutput).units
                }, this.selectedOutput.id).subscribe((res) => {
                    console.log(res)
                })
            }
            else {
                this.tagService.updateDigitalOutput({
                    description: this.selectedOutput.description,
                    address: this.selectedOutput.address,
                    initialValue: this.selectedOutput.initialValue,
                }, this.selectedOutput.id).subscribe((res) => {
                    console.log(res)
                })
            }
            this.closeForm()
            return
        }
        if(this.selectedType == InputType.ANALOG) {
            this.tagService.createAnalogOutput({
                description: this.name,
                address: Number(this.address),
                initialValue: Number(this.initalValue),
                lowLimit: Number(this.unitsFrom),
                highLimit: Number(this.unitsTo),
                units: this.unit
            }).subscribe((res) => {
                console.log(res)
                this.analogItems.push(res)
            })
            this.closeForm()
            return
        } else {
            this.tagService.createDigitalOutput({
                description: this.name,
                address: Number(this.address),
                initialValue: Number(this.initalValue),
            }).subscribe((res) => {
                console.log(res)
                this.digitalItems.push(res)
            })
            this.closeForm()
            return
        }
    }
    deleteOutput() {
        if (this.selectedType == InputType.ANALOG){
            this.tagService.deleteAnalogOutput((this.selectedOutput as AnalogOutput).id).subscribe((res) => console.log(res))
            this.analogItems.splice(this.analogItems.indexOf(this.selectedOutput as AnalogOutput), 1)
        }
        else {
            this.tagService.deleteDigitalOutput((this.selectedOutput as DigitalOutput).id).subscribe((res) => console.log(res))
            this.digitalItems.splice(this.digitalItems.indexOf(this.selectedOutput as DigitalOutput), 1)
        }
        this.closeForm()
    }

    isPreview: boolean = true
    selectedType: InputType = InputType.ANALOG
    selectedOutput: AnalogOutput | DigitalOutput | undefined = undefined
    
    // Input FoRm ;)
    name: string = ""
    address: string = ""
    initalValue: string = ""
    unitsFrom: string = ""
    unitsTo: string = ""
    unit: string = ""

    addresses: { label: string, value: any }[] = []
    generateAddresses() {
        this.addresses = []
        let takenAddresses: number[] = []
        this.analogItems.forEach((input) => {
            takenAddresses.push(input.address)
        })
        this.digitalItems.forEach((input) => {
            takenAddresses.push(input.address)
        })
        for(let i = 1; i <= 20; i++) {
            if(takenAddresses.indexOf(i) == -1) 
            this.addresses.push({ label: "Address " + i, value: i })
        }
    }
    
    toggleAdd() {
        this.isPreview = !this.isPreview
        this.selectedOutput = undefined
        this.clearForm()
    }
    toggleEdit(output: any) {
        this.selectedOutput = output
        this.name = output["description"]
        this.address = output["address"]
        this.initalValue = output["initialValue"] != undefined ? output["initialValue"] : ""
        this.unitsFrom = output["lowLimit"] != undefined ? output["lowLimit"] : ""
        this.unitsTo = output["highLimit"] != undefined ? output["highLimit"] : ""
        this.unit = output["units"] != undefined ? output["units"] : ""
        this.addresses.push({label: "Address " + this.address, value: this.address})
        this.addresses.sort((a, b) => {
            if(Number(a.value) == Number(b.value)) return 0
            else if (Number(a.value) > Number(b.value)) return 1
            else return -1
        })

        this.isPreview = false
    }
    clearForm() {
        this.name = ""
        this.address = ""
        this.initalValue = ""
        this.unitsFrom = ""
        this.unitsTo = ""
        this.unit = ""
        this.generateAddresses()
    }
    closeForm() {
        this.isPreview = true
        this.selectedOutput = undefined
        this.clearForm()
    }

    analogItems: AnalogOutput[] = []
    digitalItems: DigitalOutput[] = []
}
