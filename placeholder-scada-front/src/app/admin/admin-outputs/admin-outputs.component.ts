import { Component } from '@angular/core';
import { InputType } from 'src/app/dto/InputDTOs';
import { AnalogOutput, DigitalOutput } from 'src/app/dto/OutputDTOs';

@Component({
  selector: 'app-admin-outputs',
  templateUrl: './admin-outputs.component.html',
  styleUrls: ['./admin-outputs.component.css']
})
export class AdminOutputsComponent {

    constructor() {
        this.generateAddresses()
    }

    saveOutput() {
        if(this.selectedOutput != undefined) {
            this.selectedOutput.Description = this.name
            this.selectedOutput.Address = Number(this.address)
            this.selectedOutput.InitialValue = Number(this.initalValue)
            if ((this.selectedOutput as AnalogOutput).LowLimit != undefined) {
                (this.selectedOutput as AnalogOutput).LowLimit = Number(this.unitsFrom);
                (this.selectedOutput as AnalogOutput).HighLimit = Number(this.unitsTo);
                (this.selectedOutput as AnalogOutput).Units = this.unit;
            }
            this.closeForm()
            return
        }
        if(this.selectedType == InputType.ANALOG) {
            this.analogItems.push({
                Id: 0,
                Description: this.name,
                Address: Number(this.address),
                InitialValue: Number(this.initalValue),
                LowLimit: Number(this.unitsFrom),
                HighLimit: Number(this.unitsTo),
                Units: this.unit
            })
            this.closeForm()
            return
        } else {
            this.digitalItems.push({
                Id: 0,
                Description: this.name,
                Address: Number(this.address),
                InitialValue: Number(this.initalValue)
            })
            this.closeForm()
            return
        }
        // TODO Backend call on each case
    }
    deleteOutput() {
        if (this.selectedType == InputType.ANALOG) this.analogItems.splice(this.analogItems.indexOf(this.selectedOutput as AnalogOutput), 1)
        else this.digitalItems.splice(this.digitalItems.indexOf(this.selectedOutput as DigitalOutput), 1)
        this.closeForm()
        // TODO Backend call
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
            takenAddresses.push(input.Address)
        })
        this.digitalItems.forEach((input) => {
            takenAddresses.push(input.Address)
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
        this.name = output["Description"]
        this.address = output["Address"]
        this.initalValue = output["InitialValue"] != undefined ? output["InitialValue"] : ""
        this.unitsFrom = output["LowLimit"] != undefined ? output["LowLimit"] : ""
        this.unitsTo = output["HighLimit"] != undefined ? output["HighLimit"] : ""
        this.unit = output["Units"] != undefined ? output["Units"] : ""
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

    analogItems: AnalogOutput[] = 
    [
        {
            Id: 0,
            Description: "Temperatura",
            Address: 1,
            InitialValue: 0,
            LowLimit: -40,
            HighLimit: 90,
            Units: "C"
        }
    ]
    digitalItems: DigitalOutput[] = 
    [
        {
            Id: 0,
            Description: "Not Temperatura",
            Address: 2,
            InitialValue: 0
        }
    ]
}
