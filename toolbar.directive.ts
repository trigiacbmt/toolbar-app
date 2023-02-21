import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Directive, ElementRef, EmbeddedViewRef, HostListener, Injector, OnDestroy, Renderer2 } from "@angular/core";
import { ToolbarComponent } from "./toolbar.component";
import {v4 as uuidv4} from "uuid";

@Directive({
    selector: '[toolbar]'
})

export class ToolbarDirective implements OnDestroy {
    private componentRef: ComponentRef<ToolbarComponent> = null;
    private domEl: HTMLElement;
    constructor(private elementRef: ElementRef, private renderer: Renderer2,private appRef: ApplicationRef, private componentFactoruResolver: ComponentFactoryResolver, private injector: Injector){}
    @HostListener('document:mousedown', ['$event'])
    onMouseDown(event) {
        if(event.target && this.elementRef.nativeElement.contains(event.target)) {
            console.log(event.target)
            if(this.componentRef === null) {
                const componentFactory = this.componentFactoruResolver.resolveComponentFactory(ToolbarComponent);
                this.componentRef = componentFactory.create(this.injector);
                this.appRef.attachView(this.componentRef.hostView);
                this.domEl = (this.componentRef.hostView as EmbeddedViewRef<any>)
                .rootNodes[0] as HTMLElement;
                this.renderer.appendChild(document.body,this.domEl)
                this.setToolbarComponentProperties()
            } 

        }
    }

    @HostListener('document:mouseup', ['$event'])
    onMouseUp(event) {
        if(event.target && !this.elementRef.nativeElement.contains(event.target) && this.domEl && !this.domEl.contains(event.target)) {
            this.onDestroy()
        }
    }

    private setToolbarComponentProperties() {
        if (this.componentRef !== null) {
          this.componentRef.instance.elRef = this.elementRef;
          this.componentRef.instance.id = uuidv4();
        }
    }

    ngOnDestroy(): void {
        this.onDestroy()
    }

    onDestroy() {
        if (this.componentRef !== null) {
            this.appRef.detachView(this.componentRef.hostView);
            this.componentRef.destroy();
            this.componentRef = null;
          }
    }
}