import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ToolbarComponent } from "./toolbar.component";
import { ToolbarDirective } from "./toolbar.directive";

@NgModule({
    imports: [CommonModule],
    declarations: [ToolbarComponent, ToolbarDirective],
    providers: [],
    exports: [ToolbarComponent, ToolbarDirective]
})

export class ToolbarModule {}