import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActualListPage } from './actual-list';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    ActualListPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(ActualListPage),
  ],
})
export class ActualListPageModule {}
