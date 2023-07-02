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
        this.tagService.analogOutputCreated.subscribe(o => {
            this.analogItems.push(o)
            this.generateOutputsList()
        })
        this.tagService.analogOutputDeleted.subscribe(o => {
            this.analogItems.splice(this.analogItems.indexOf(o), 1)
            if(this.selectedOutputId == o.id.toString()) this.selectedOutputId = ""
            this.generateOutputsList()
        })
        this.tagService.digitalOutputCreated.subscribe(o => {
            this.digitalItems.push(o)
            this.generateOutputsList()
        })
        this.tagService.digitalOutputDeleted.subscribe(o => {
            this.digitalItems.splice(this.digitalItems.indexOf(o), 1)
            if(this.selectedOutputId == o.id.toString()) this.selectedOutputId = ""
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
