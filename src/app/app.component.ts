import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      FirstName: ['',[Validators.required,Validators.pattern("^[a-zA-Z]+$")]],
      LastName: ['',[Validators.required,Validators.pattern("^[a-zA-Z]+$")]],
      Department:['',Validators.required],
      Position:['',Validators.required],
      Address1:['',Validators.required],
      Address2:[''],
      State:['',Validators.required],
      City:['',Validators.required],
      PinCode:['',[Validators.required,Validators.minLength(6),Validators.pattern("^[0-9]+$")]]
    });
  }
 
  ngOnInit(){
    this.buildForm();
    this.getEmployee();
    this.getEmployeeDetailsFromJsonFile();
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
  getEmployeeDetailsFromJsonFile(){
    this.sharedService.getEmployeeDetailsFromJsonFile().subscribe(data=>{
      console.log('getEmployee1',data);
    },
    error=>{
      console.log(error)
    })
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
