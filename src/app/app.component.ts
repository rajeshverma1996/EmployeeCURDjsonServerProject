import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Employee } from './model/employee';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'JsonCurdProject';
  employeeForm:any;
  employeeModel = new Employee();
 employeeDetails:Employee[]=[];
 filterEmployeeDetails:Employee[]=[];
 IsUpdate=false;
  constructor(
    private formBuilder: FormBuilder,
    private sharedService:SharedService
  ){}
  buildForm(){
    this.employeeForm = this.formBuilder.group({
      FirstName: [''],
      LastName: [''],
      Department:[''],
      Position:[''],
      Address1:['',],
      Address2:[''],
      State:[''],
      City:[''],
      PinCode:['']
    });
  }
 
  ngOnInit(){
    this.buildForm();
    this.getEmployee();
  }

  postEmployee(){
    this.sharedService.postEmployee(this.employeeModel).subscribe(data=>{
      console.log(data);
      alert("data added successfully");
      this.getEmployee();
      this.resetForm();
    },
    error=>{
      console.log(error)
    }
      
    )

  }

  getEmployee(){
    this.sharedService.getEmployee().subscribe(data=>{
      console.log(data);
      this.employeeDetails=data;
      this.filterEmployeeDetails=[...this.employeeDetails]
    },
    error=>{
      console.log(error)
    })
  }
  editEmployee(emp:any){
    console.log(emp);
    this.employeeModel=emp;
    this.IsUpdate=true;
  }
  updateEmployee(){
    console.log(this.employeeModel)
    this.sharedService.updateEmployee(this.employeeModel).subscribe(data=>{
      console.log(data);
      alert("data updated successfully");
      this.getEmployee();
      this.resetForm();
    },
    error=>{
      console.log(error)
    })

  }
  resetForm(){
    this.employeeForm.reset();
    this.employeeModel=new Employee();
  }

  deleteEmployee(id:any){
    console.log(id);
    this.sharedService.deleteEmployee(id).subscribe(data=>{
      console.log(data);
      alert("data deleted successfully");
      this.getEmployee();
      this.resetForm();
    },
    error=>{
      console.log(error)
    })
  }

}
