import { Component } from '@angular/core';
import { AnalogOutput, DigitalOutput } from 'src/app/dto/OutputDTOs';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-rtu',
  templateUrl: './rtu.component.html',
  styleUrls: ['./rtu.component.css']
})
export class RtuComponent {

    constructor(private tagService: TagService) {
        this.tagService.getAnalogOutputs().subscribe((res) => {
            console.log(res)
            this.analogItems = res
            this.generateOutputsList()
        })
        this.tagService.getDigitalOutputs().subscribe((res) => {
            console.log(res)
            this.digitalItems = res
            this.generateOutputsList()
        })
    }
    
    saveRTU() {

    }

    isPreview: boolean = false
    outputs: { label: string, value: AnalogOutput | DigitalOutput }[] = []
    generateOutputsList() {
        this.outputs = []
        this.analogItems.forEach(item => { if(item.description != null) this.outputs.push({ label: item.description, value: item }) })
        this.digitalItems.forEach(item => { if(item.description != null) this.outputs.push({ label: item.description, value: item }) })
    }

    selectedOutputId: string = ""
    isAnalog: boolean = false
    writeTime: string = ""

    setOutput(output: AnalogOutput | DigitalOutput) {
        this.selectedOutputId = output.id.toString()
        this.isAnalog = (output as AnalogOutput)["lowLimit"] != undefined;
    }

    analogItems: AnalogOutput[] = []
    
    digitalItems: DigitalOutput[] = []
}
