import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent {

    @Input() items: number[] = []
    @Input() options: { label: string, value: any }[] = []
    @Output() onSelected: EventEmitter<any> = new EventEmitter()
    
    @Input() set selected(value: any) {
        console.log(typeof(value));
        console.log(this.options);
        console.log(this.options.find(val => val.value.toString() == value.toString()));
        let found = this.options.find(val => val.value.toString() == value.toString())
        if (found != undefined) this.value = found
        else this.value = { label: "", value: "" }
    }

    isMenuOpend: boolean = false
    offsetX: number = 0
    offsetY: number = 0

    @ViewChild('targetSpan', { static: false })
    targetSpan!: ElementRef;
    
    value:  { label: string, value: any } = { label: "", value: "" }
    
    toggleMenu() {
        if(this.targetSpan.nativeElement.getBoundingClientRect().y > 500 && !this.isMenuOpend) this.offsetY = -300
        else this.offsetY = 0
        this.isMenuOpend = !this.isMenuOpend
    }

    onItemClicked(item:  { label: string, value: any }) {
        this.isMenuOpend = false
        this.value = item
        this.onSelected.emit(item.value)
    }
}
