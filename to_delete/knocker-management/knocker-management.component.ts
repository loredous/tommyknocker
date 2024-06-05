import { Component, OnInit } from '@angular/core';
import { Knocker } from '../interfaces';
import { TommyknockerAPIService } from '../tommyknocker-api.service';
import { NgFor } from '@angular/common';
import { ClarityModule } from "@clr/angular";
import { FormsModule } from '@angular/forms';
import {Clipboard} from '@angular/cdk/clipboard';

@Component({
  selector: 'app-knocker-management',
  standalone: true,
  imports: [NgFor, ClarityModule, FormsModule],
  templateUrl: './knocker-management.component.html',
  styleUrl: './knocker-management.component.css'
})
export class KnockerManagementComponent implements OnInit {
  knockers: Knocker[] = [];
  active_knocker: Knocker = { id: '', name: '', description: '', last_seen: new Date() };
  edit_opened: boolean = false;
  create_opened: boolean = false;
  private interval: any;

  constructor(private api: TommyknockerAPIService, private clipboard: Clipboard) {}

  ngOnInit() {
    this.refreshData();
    this.interval = setInterval(() => { 
      this.refreshData(); 
  }, 30000);
  }

  refreshData() {
    this.api.getKnockers().subscribe(knockers => this.knockers = knockers);
  }

  onDelete(knocker: Knocker) {
    this.api.deleteKnocker(knocker.id).subscribe(() => {
      this.knockers = this.knockers.filter(k => k !== knocker);
    });
  }

  onEdit(knocker: Knocker) {
    this.active_knocker = structuredClone(knocker);
    this.edit_opened = true;
  }

  editCancelled() {
    this.edit_opened = false;
    this.ngOnInit();
  }

  editSubmitted() {
    this.api.updateKnocker(this.active_knocker.id, this.active_knocker).subscribe(() => {
      this.edit_opened = false;
      this.ngOnInit();
    });
  }

  onCreate() {
    this.active_knocker = { id: '', name: '', description: '', last_seen: new Date() };
    this.create_opened = true;
  }

  createCancelled() {
    this.create_opened = false;
    this.ngOnInit();
  }

  createSubmitted() {
    this.api.createKnocker(this.active_knocker).subscribe(() => {
      this.create_opened = false;
      this.ngOnInit();
    });
  }

  onCopy(knocker: Knocker) {
    this.clipboard.copy(knocker.id);
  }

}
