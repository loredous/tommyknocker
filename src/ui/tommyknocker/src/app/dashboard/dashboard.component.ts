import { Component } from '@angular/core';
import { Teststatus } from '../teststatus';
import { ControllerApiService } from '../controller-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  api_service = new ControllerApiService();
  
}
