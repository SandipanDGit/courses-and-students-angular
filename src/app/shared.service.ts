import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ControllerService {

  //list of students to be sent from course component to student component
  studentList = new BehaviorSubject<string[]>([])
  getStudentList = this.studentList.asObservable()

  //new student name to be sent from student component to course component
  newStudent = new BehaviorSubject<string>('')
  getNewStudent = this.newStudent.asObservable()

  //send course selection status
  courseSelected = new BehaviorSubject<boolean>(false)
  getCourseSelected = this.courseSelected.asObservable()

  constructor() { }
}
