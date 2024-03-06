import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from './components/layout/layout.module';

@NgModule({
  imports: [LayoutModule, FormsModule, CommonModule, ReactiveFormsModule],
  exports: [LayoutModule, FormsModule, CommonModule, ReactiveFormsModule],
  providers: [],
})
export class SharedModule {}
