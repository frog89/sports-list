import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { PlayDay } from 'src/app/model/playday.model';
import { Player } from 'src/app/model/player.model';
import { DataService } from '../../shared/data.service';

export interface PlayerItem {
  id: number;
  display: string;
}

@Component({
  selector: 'app-edit-playday',
  templateUrl: './edit-playday.component.html',
  styleUrls: ['./edit-playday.component.scss']
})
export class EditPlaydayComponent implements OnInit {
  myForm: FormGroup;
  playday: PlayDay;
  allPlayers: Player[];
  choosablePlayers: PlayerItem[] = [];

  constructor(private fb: FormBuilder, private route: ActivatedRoute, 
      private dataService: DataService) { 
    this.playday = {
      id: 4711,
      day: new Date(2018,0,28),
      playerIds: [1, 3],
      extraPayIds: [],
      isCancelled: false,
      numOfHours: 1,
      numOfCourts: 1
    }

    this.dataService.getPlayers().subscribe(
      p => {
        this.allPlayers = p;
        this.initPlaydayForm();
      } );
  }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');

    this.myForm = this.fb.group( {
      dayControl: [this.playday.day, Validators.compose([Validators.required])],
      isCancelled: [this.playday.isCancelled],
      numOfHours: [this.playday.numOfHours],
      numOfCourts: [this.playday.numOfCourts]
    });

    for (var i: number = 0; i < 10; i++) {
      var controlName : string = `playerControl${i+1}`;
      var ctrl : FormControl = new FormControl(null);
      this.myForm.addControl(controlName, ctrl);
    }

    this.myForm.validator = Validators.compose([
      this.valiDifferentPlayers(),
      this.valiCancelledAndCourtsAndHours(
        this.myForm.controls.isCancelled,
        this.myForm.controls.numOfHours,
        this.myForm.controls.numOfCourts)]);
  }

  valiCancelledAndCourtsAndHours(isCancelledCtrl: AbstractControl, 
      numOfHoursCtrl: AbstractControl, 
      numOfCourtsCtrl: AbstractControl) {
    return (group: FormGroup): {[key: string]: any} => {
      if (isCancelledCtrl.value && numOfHoursCtrl.value > 0)
        return { invalidCancelledButHoursGreaterZero: true };
      if (!isCancelledCtrl.value && numOfHoursCtrl.value <= 0)
        return { invalidNotCancelledButHoursZero: true };
      if (isCancelledCtrl.value && numOfCourtsCtrl.value > 0) 
        return { invalidCancelledButCourtsGreaterZero: true };
      if (!isCancelledCtrl.value && numOfCourtsCtrl.value <= 0)
        return { invalidNotCancelledButCourtsZero: true };
    }
  }

  valiDifferentPlayers() {
    return (group: FormGroup): {[key: string]: any} => {
      let values = [group.controls.playerControl1.value,
        group.controls.playerControl2.value,
        group.controls.playerControl3.value,
        group.controls.playerControl4.value,
        group.controls.playerControl5.value];
      for (var i: number = 0; i<values.length; i++) {
        for (var j: number = i+1; j<values.length; j++) {
          if (values[i] != null && values[j] != null && values[i] == values[j]) {
            return {
              equalPlayers: true
            };
          }
        }
      }
    }
  }
  
  initPlaydayForm() : void {
    for (var i: number = 0; i < this.allPlayers.length; i++) {
      var playerId : number = this.allPlayers[i].id;
      this.choosablePlayers.push( { 
        id: playerId,
        display: this.getPlayerNameById(playerId)
      });
    }

    for (var i: number = 0; i < this.playday.playerIds.length; i++) {
      var playerId : number = this.playday.playerIds[i];
      var controlName : string = `playerControl${i+1}`;
      this.myForm.controls[controlName].setValue(playerId);
    }

    //this.myForm.valueChanges.subscribe(console.log);
  }


  /*
  get bar():boolean {
    return this._bar;
  }
  set bar(theBar:boolean) {
    this._bar = theBar;
  }
  */
   getPlayerNameById(id: number) : string {
     var p: Player = this.allPlayers == null ? null : this.allPlayers.find(p => p.id == id);
     return this.getPlayerName(p);
   }
   getPlayerName(p: Player) : string {
     if (p == null)
       return "?";
     return `${p.lastName}, ${p.firstName}`;
   }

  onSubmit() {
    console.log("Day: " + this.myForm.value.dayControl);
    console.log("playerControl1: " + this.myForm.value.playerControl1);
    console.log("playerControl2: " + this.myForm.value.playerControl2);
    console.log("playerControl3: " + this.myForm.value.playerControl3);
    console.log("playerControl4: " + this.myForm.value.playerControl4);
    console.log("playerControl5: " + this.myForm.value.playerControl5);
    console.log("isCancelled: " + this.myForm.value.isCancelled);
    console.log("numOfHours: " + this.myForm.value.numOfHours);
    console.log("numOfCourts: " + this.myForm.value.numOfCourts);
    
  }


}
