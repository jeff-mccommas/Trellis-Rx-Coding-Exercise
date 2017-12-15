import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {DashboardService} from './dashboard.service';
import {HttpHandleService} from "../shared/httphandle.service";
import { log } from 'util';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DashboardService, HttpHandleService]
})
export class DashboardComponent implements OnInit {
  patients: any[];
  selectedPatient: any;
  selectedPatientObj:any;
  constructor(private dashboardService: DashboardService, private toastr: ToastrService) { }
  getPatients(): void{
    // this.dashboardService.getPatients().subscribe(patients => this.patients = patients);;
    this.dashboardService.getPatients().subscribe((res: any) => { this.patients = res.json() }, () => {  });
  }
  ngOnInit() {
    this.getPatients();
  }
  onSelect(patient: any): void {
    this.selectedPatientObj = patient; 
    this.dashboardService.getPatientDetail(patient._id).subscribe((res: any) => { this.selectedPatient = res.json() }, () => {  });
  }
  updatePatient(): void {
      var requestObj = {
          userId: this.selectedPatient._id,
          pulse: this.selectedPatient.currentPulse,
          temperature: this.selectedPatient.currentTemp,

      };
      this.dashboardService.updateTempPulse(requestObj).subscribe((res: any) => { this.toastr.success("Patient update success.") }, () => {  });;
  }
}
