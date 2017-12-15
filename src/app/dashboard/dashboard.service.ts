import { Injectable } from '@angular/core';
import {HttpHandleService} from "../shared/httphandle.service";
@Injectable()
export class DashboardService {
  getPatients() {
    return this.httpHandleService.get("http://localhost:8000/users");
  }
  getPatientDetail(patiendid) {
    return this.httpHandleService.get("http://localhost:8000/users/" + patiendid);
  }
  updateTempPulse(requestData) {
    console.log(requestData);
    return this.httpHandleService.post("http://localhost:8000/updateparams", requestData);
  }
  constructor(private httpHandleService:HttpHandleService) { }

}