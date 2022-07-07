import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employee } from '../model/employee';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  @Input() employeeDetails:Employee[]=[];
  @Output() empModel : EventEmitter<Employee> = new EventEmitter();
  @Output() empId : EventEmitter<number> = new EventEmitter();
  @Input() filterEmployeeDetails:Employee[]=[];
  constructor(
    private sharedService:SharedService
  ) { }

  ngOnInit(): void {
  }
  editEmployee(emp:Employee){
    const empDetails={...emp};
    this.empModel.emit(empDetails);

  }
  deleteEmployee(id:number){
    if(confirm("Do you want to delete this data")){
      return this.empId.emit(id)
    }else{
      return false
    }
    
  }

  onSearchEmployee(searchText:string){
    console.log(searchText);
    if(searchText){
      this.filterEmployeeDetails = this.employeeDetails.filter((emp) => {
        return new RegExp(searchText, 'i').test(emp.FirstName) || new RegExp(searchText, 'i').test(emp.LastName)
        || new RegExp(searchText, 'i').test(emp.Department) || new RegExp(searchText, 'i').test(emp.State)
        || new RegExp(searchText, 'i').test(emp.Position);
    });
    }else{
      this.filterEmployeeDetails=[...this.employeeDetails];
    }
    
  }
}
