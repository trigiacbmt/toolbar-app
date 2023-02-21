import { DOCUMENT } from "@angular/common";
import { AfterViewInit, Component, ElementRef, Inject } from "@angular/core";

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})

export class ToolbarComponent implements AfterViewInit {
    public elRef: ElementRef;
    htmlMode: boolean = false;
    public id: string;
    constructor(private el: ElementRef, @Inject(DOCUMENT) private document: Document){}
    ngAfterViewInit(): void {
        this.document.getElementById(`bold-${this.id}`).classList.add('active')
        
    }
    triggerCommand(command: string) {
        if(command == 'bold' ) {
            if(this.elRef.nativeElement.style.fontWeight == '700') {
                this.elRef.nativeElement.style.fontWeight = '400'
            }else{
                this.elRef.nativeElement.style.fontWeight = '700'
            }
            
        }else if (command == 'italic'){
            this.elRef.nativeElement.style.fontStyle = 'italic'
        }
        
        console.log(this.elRef.nativeElement)
    }

    isButtonHidden(command: string) {
        return false
    }
}