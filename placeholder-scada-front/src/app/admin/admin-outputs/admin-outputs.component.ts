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

    }
    deleteOutput() {

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

    addresses: number[] = []
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
                this.addresses.push(i)
        }
    }
    
    toggleAdd() {
        this.isPreview = !this.isPreview
        this.selectedOutput = undefined
        this.clearForm()
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

    analogItems: AnalogOutput[] = 
    [
        {
            Id: 0,
            Description: "Temperatura",
            Address: 0,
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
            Address: 1
        }
    ]
}
