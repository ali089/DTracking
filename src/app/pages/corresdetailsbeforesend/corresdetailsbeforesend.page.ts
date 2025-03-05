import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-corresdetailsbeforesend',
  templateUrl: './corresdetailsbeforesend.page.html',
  styleUrls: ['./corresdetailsbeforesend.page.scss'],
})
export class CorresdetailsbeforesendPage implements OnInit {

  public data: any = {}
  constructor(public route:ActivatedRoute) { 
    this.route.queryParams.subscribe(params =>{
      this.data = params;
      console.log(this.data);
    });
    
  }

  ngOnInit() {
  }

}
