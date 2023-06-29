import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent {

    @Input() items: number[] = []
    @Output() onSelected: EventEmitter<number> = new EventEmitter()
    
    @Input() set selected(value: string) {
        if(value == "") this.value = ""
        else this.value = "Address " + value
    }

    isMenuOpend: boolean = false
    offsetX: number = 0
    offsetY: number = 0

    @ViewChild('targetSpan', { static: false })
    targetSpan!: ElementRef;
    
    value: string = ""
    
    toggleMenu() {
        if(this.targetSpan.nativeElement.getBoundingClientRect().y > 500 && !this.isMenuOpend) this.offsetY = -300
        else this.offsetY = 0
        this.isMenuOpend = !this.isMenuOpend
    }

    onItemClicked(item: number) {
        this.isMenuOpend = false
        this.value = "Address " + item
        this.onSelected.emit(item)
    }
}
