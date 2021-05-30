import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ControllerService } from '../shared.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})

export class CourseComponent implements OnInit {
  //--------------------CONSTRUCTOR--------------------
  constructor(private fb: FormBuilder,
    private controller: ControllerService,
    private cd: ChangeDetectorRef) {}

  //------------------VARIABLE DECLARATION------------------
  activeInput: boolean = false  //whether input box for new course is visible or not
  activeCourse = ''

  //the map is of type string => string[]
  data: Map<string, string[]> = new Map()

  myform = this.fb.group({
    courses: [''],
    newCourse: ['', Validators.required]
  })

  //--------------------ngOnInit--------------------------
  ngOnInit(): void {

    this.controller.getNewStudent.subscribe(name =>{
      if(this.activeCourse !== ''){
        let temp: string[] = this.data.get(this.activeCourse) || []
        temp.push(name)
        this.data.set(this.activeCourse, temp)
        console.log("current data:", this.data)
      }
    })
   }

  //----------------------METHODS--------------------------
  isActiveInput(){
    return this.activeInput
  }
  onCourseChange(){
    //change active course
    this.activeCourse = this.myform.value.courses

    //send the student list corresponding to new active course into subject
    this.controller.studentList.next(this.data.get(this.activeCourse) || [])
  }
  onAdd(){
    this.activeInput = !this.activeInput
    console.log("adding")
  }
  onTick(){
    //push new course to map if its not empty
    if(this.myform.value.newCourse.trim() !== '')
      this.data.set(this.myform.value.newCourse, [])

    //reset the input box
    this.myform.patchValue({
      newCourse: ''
    })

    //toggle activeInput to vanish input box from DOM
    this.activeInput = !this.activeInput
  }
  onCross(){
    this.activeInput = !this.activeInput
    console.log("crossed")
  }

}
