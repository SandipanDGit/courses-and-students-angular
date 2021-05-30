import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { CourseComponent } from './course/course.component';
import { StudentComponent } from './student/student.component';
import { ControllerService } from './shared.service'

@NgModule({
  declarations: [
    AppComponent,
    CourseComponent,
    StudentComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [ControllerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
