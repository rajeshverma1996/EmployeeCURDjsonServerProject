import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from './model/employee';
import {map} from 'rxjs/operators'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private baseUrl="http://localhost:3000";
  private getEmpolyeeApi='/Employee';
  private postEmpolyeeApi='/Employee';
  private updateEmpolyeeApi='/Employee/';
  private deleteEmpolyeeApi='/Employee/';
  private baseUrl1='assets/json/employee.json'


  constructor(
    private httpClient:HttpClient
  ) { }

    postEmployee(body:Employee):Observable<any>{
      return this.httpClient.post(this.baseUrl+this.postEmpolyeeApi,body)
      .pipe(map((res:any)=>res))
      
    }
    getEmployee():Observable<Employee[]>{
      return this.httpClient.get(this.baseUrl+this.getEmpolyeeApi)
      .pipe(map((res:any)=>res))
      
    }
    updateEmployee(body:Employee):Observable<Employee[]>{
      return this.httpClient.put(this.baseUrl+this.updateEmpolyeeApi+body.id,body)
      .pipe(map((res:any)=>res))
      
    }
    deleteEmployee(id:number):Observable<Employee[]>{
      return this.httpClient.delete(this.baseUrl+this.deleteEmpolyeeApi+id)
      .pipe(map((res:any)=>res))
      
    }
   
    getEmployeeDetailsFromJsonFile():Observable<Employee[]>{
      return this.httpClient.get(this.baseUrl1)
      .pipe(map((res:any)=>res))
      
    }


}
