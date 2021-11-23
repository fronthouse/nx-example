import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './users.routes';
@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class UsersSectionModule {}
