import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-set-grade',
  templateUrl: './set-grade.component.html',
  styleUrls: ['./set-grade.component.css']
})
export class SetGradeComponent implements OnInit {
  routeSub!:string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params['id']) //log the entire params object
      console.log(params['id']) //log the value of id
    });
  }

}
