import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TemplateComponent } from './template.component';

@NgModule({
  declarations: [TemplateComponent],
  imports: [RouterModule],
  exports: [TemplateComponent]
})
export class TemplateModule {}
