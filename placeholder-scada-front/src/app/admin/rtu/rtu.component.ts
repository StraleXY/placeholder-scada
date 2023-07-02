import { Component } from '@angular/core';
import { AnalogOutput, DigitalOutput } from 'src/app/dto/OutputDTOs';

@Component({
  selector: 'app-rtu',
  templateUrl: './rtu.component.html',
  styleUrls: ['./rtu.component.css']
})
export class RtuComponent {

    constructor() {
        this.generateOutputsList()
    }
    
    saveRTU() {

    }

    isPreview: boolean = false
    outputs: { label: string, value: AnalogOutput | DigitalOutput }[] = []
    generateOutputsList() {
        this.outputs = []
        this.analogItems.forEach(item => { if(item.Description != null) this.outputs.push({ label: item.Description, value: item }) })
        this.digitalItems.forEach(item => { if(item.Description != null) this.outputs.push({ label: item.Description, value: item }) })
    }

    selectedOutputId: string = ""
    isAnalog: boolean = false
    writeTime: string = ""

    setOutput(output: AnalogOutput | DigitalOutput) {
        this.selectedOutputId = output.Id.toString()
        this.isAnalog = (output as AnalogOutput)["LowLimit"] != undefined;
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
