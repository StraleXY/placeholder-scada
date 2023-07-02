import { Component } from '@angular/core';
import { AnalogOutput, DigitalOutput, RealTimeUnit } from 'src/app/dto/OutputDTOs';
import { RtuService } from 'src/app/services/rtu.service';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-rtu',
  templateUrl: './rtu.component.html',
  styleUrls: ['./rtu.component.css']
})
export class RtuComponent {

    constructor(private tagService: TagService, private rtuService: RtuService) {
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
        this.rtuService.getAll().subscribe((res) => {
            this.rtus = res
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
        this.rtuService.createRTU({
            isAnalog: this.isAnalog,
            tagId: Number(this.selectedOutputId),
            writeTime: Number(this.writeTime)
        }).subscribe(res => {
            this.rtus.push(res)
            this.generateOutputsList()
        })
    }
    deletRTU(rtu: RealTimeUnit) {
        this.rtus.splice(this.rtus.indexOf(rtu), 1)
        this.rtuService.deleteRtu(rtu.id).subscribe((res) => {
            this.generateOutputsList()
        })
    }

    isPreview: boolean = false
    outputs: { label: string, value: AnalogOutput | DigitalOutput }[] = []
    generateOutputsList() {
        this.outputs = []
        this.analogItems.forEach(item => { if(item.description != null && this.rtus.find(r => r.tagId == item.id) == undefined) this.outputs.push({ label: item.description, value: item }) })
        this.digitalItems.forEach(item => { if(item.description != null && this.rtus.find(r => r.tagId == item.id) == undefined) this.outputs.push({ label: item.description, value: item }) })
        this.clearForm()
    }

    selectedOutputId: string = ""
    isAnalog: boolean = false
    writeTime: string = ""
    clearForm() {
        this.selectedOutputId = ""
        this.isAnalog = false
        this.writeTime = ""
    }

    setOutput(output: AnalogOutput | DigitalOutput) {
        this.selectedOutputId = output.id.toString()
        this.isAnalog = (output as AnalogOutput)["lowLimit"] != undefined;
    }

    getOutput(rtu: RealTimeUnit) : AnalogOutput | DigitalOutput {
        if(rtu.isAnalog) return this.analogItems.find(o => o.id == rtu.tagId)!
        else return this.digitalItems.find(o => o.id == rtu.tagId)!
    }

    analogItems: AnalogOutput[] = []
    digitalItems: DigitalOutput[] = []

    rtus: RealTimeUnit[] = []
}
