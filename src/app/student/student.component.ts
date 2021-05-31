import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms'
import { faBaby } from '@fortawesome/free-solid-svg-icons';
import { ControllerService } from '../shared.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private controller: ControllerService,) {}

  //---------------VARIABLE DECLARATIONS---------------
  courseSelected: boolean = false
  activeInput: boolean = false
  newStudentLocal: string = ''
  studentListLocal: string[] = ['']
  studentForm = this.fb.group({
    students: [''],
    newStudent: ['']
  })

  //-----------------------ngOnInit---------------------
  ngOnInit(): void {
    this.controller.getStudentList.subscribe(data => {
      if(data){
        this.studentListLocal = data
      }
    })

    //get notified if course is selected or not
    this.controller.getCourseSelected.subscribe(flag => {
      this.courseSelected = flag

      //reset the input box if course deselected
      if(!this.courseSelected){
        this.studentListLocal = []
      }
    })
  }

  //----------------METHODS-------------------
  isActiveInput(){
    return this.activeInput
  }
  onNewStudent(){
    this.activeInput = !this.activeInput
  }

  onTick(){
    //if course was selected and non empty name provided, send new name into subject
    if(this.studentForm.value.newStudent.trim() !== '' && this.courseSelected){
      this.controller.newStudent.next(this.studentForm.value.newStudent)
    }

    //reset the input box
    this.studentForm.patchValue({
      newStudent: ''
    })

    //toggle the visibility of input box
    this.activeInput = !this.activeInput
  }
  onCross(){
    this.activeInput = !this.activeInput
    this.studentForm.patchValue({
      newStudent: ''
    })
    console.log("crossed")
  }

}
