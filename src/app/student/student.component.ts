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
  }

  //----------------METHODS-------------------
  isActiveInput(){
    return this.activeInput
  }
  onNewStudent(){
    this.activeInput = !this.activeInput
  }

  onTick(){
    if(this.studentForm.value.newStudent.trim() !== ''){
      //push to local array that controls the student dropdown
      this.studentListLocal.push(this.studentForm.value.newStudent)

      //send in subject
      this.controller.newStudent.next(this.newStudentLocal)
    }

    //reset the input box
    this.studentForm.patchValue({
      newStudent: ''
    })

    this.activeInput = !this.activeInput
  }
  onCross(){
    this.activeInput = !this.activeInput
    console.log("crossed")
  }

}
