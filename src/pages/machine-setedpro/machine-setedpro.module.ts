import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MachineSetedproPage } from './machine-setedpro';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    MachineSetedproPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(MachineSetedproPage),
  ],
})
export class MachineSetedproPageModule {}
