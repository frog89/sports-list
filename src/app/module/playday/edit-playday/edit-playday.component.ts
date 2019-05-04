import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';

import { PlayDay } from 'src/app/model/playday.model';
import { IPlayer } from 'src/app/model/player.model';
import { DataService } from '../../shared/data.service';
import { MatCheckbox } from '@angular/material';
import { slideIn } from '../../shared/animations';

export interface PlayerItem {
  id: number;
  display: string;
}

@Component({
  selector: 'app-edit-playday',
  templateUrl: './edit-playday.component.html',
  styleUrls: ['./edit-playday.component.scss'],
  animations: [
    slideIn
  ]
})
export class EditPlaydayComponent implements OnInit {
  myForm: FormGroup;
  playday: PlayDay | null;
  allPlayers: IPlayer[];
  choosablePlayers: PlayerItem[] = [];

  constructor(private fb: FormBuilder, private route: ActivatedRoute, 
      private dataService: DataService) { 
    this.myForm = this.fb.group( {
      day: [null, Validators.compose([Validators.required])],
      isCancelled: [],
      numOfHours: [],
      numOfCourts: []
    });
    this.myForm.addControl("players", new FormArray([]));    

    this.myForm.validator = Validators.compose([
      this.valiDifferentPlayers(),
      this.valiCancelledAndCourtsAndHours(
        this.myForm.controls.isCancelled,
        this.myForm.controls.numOfHours,
        this.myForm.controls.numOfCourts)]);
  }

  onCancelClicked(cb: MatCheckbox) {
    if (cb.checked) {
      this.myForm.controls.numOfHours.setValue(1);
      this.myForm.controls.numOfCourts.setValue(1);
    } else {
      this.myForm.controls.numOfHours.setValue(0);
      this.myForm.controls.numOfCourts.setValue(0);
    }
  }

  ngOnInit() {
    // Fetch Playday for passed id
    this.dataService.getPlayers(false).subscribe(
      p => {
        this.allPlayers = p;
        this.loadPlayDay();
      } );
  }

  loadPlayDay() : void {
    let map: ParamMap = this.route && this.route.snapshot && this.route.snapshot.paramMap || null;
    let idString: string = map && map.get('id') || "0";
    let id: number = +idString;
    this.dataService.getPlayDay(id).subscribe(
      pd => {
        this.playday = pd.length == 1 ? new PlayDay(this.allPlayers, pd[0]) : null;
        this.initFormAfterDataLoad();
      });
  }

  valiCancelledAndCourtsAndHours(isCancelledCtrl: AbstractControl, 
      numOfHoursCtrl: AbstractControl, 
      numOfCourtsCtrl: AbstractControl) {
    return (ctrl: AbstractControl): {[key: string]: any} | null => {
      let group: FormGroup = ctrl as FormGroup;
      if (isCancelledCtrl.value && numOfHoursCtrl.value > 0)
        return { invalidCancelledButHoursGreaterZero: true };
      if (!isCancelledCtrl.value && numOfHoursCtrl.value <= 0)
        return { invalidNotCancelledButHoursZero: true };
      if (isCancelledCtrl.value && numOfCourtsCtrl.value > 0) 
        return { invalidCancelledButCourtsGreaterZero: true };
      if (!isCancelledCtrl.value && numOfCourtsCtrl.value <= 0)
        return { invalidNotCancelledButCourtsZero: true };
      return null;
    }
  }

  valiDifferentPlayers() {
    return (ctrl: AbstractControl): {[key: string]: any} | null => {
      let group: FormGroup = ctrl as FormGroup;
      let values: number[] = [];
      let arr = <FormArray>group.controls.players;
      for (let ctrl of arr.controls) {
        values.push(ctrl.value);
      }
      for (var i: number = 0; i<values.length; i++) {
        for (var j: number = i+1; j<values.length; j++) {
          if (values[i] != null && values[j] != null && values[i] == values[j]) {
            return {
              equalPlayers: true
            };
          }
        }
      }
      return null;
    }
  }
  
  initFormAfterDataLoad() : void {
    let playerArray: FormArray = this.myForm.get("players") as FormArray;
    for (let i: number = 0; i < this.allPlayers.length; i++) {
      let player: IPlayer = this.allPlayers[i];
      playerArray.push(new FormControl());
      this.choosablePlayers.push({
        id: player.id,
        display: this.getPlayerNameById(player.id)
      });
    }
    if (this.playday != null) {
      let arr : FormArray = <FormArray>this.myForm.get("players");
      for (let i : number=0; i < arr.length && i < this.playday.playerIds.length; i++) {
        let fc:FormControl = <FormControl>arr.at(i);
        fc.setValue(this.playday.playerIds[i]);
      }
      
      this.myForm.controls.day.setValue(this.playday.dayAsDate);
      this.myForm.controls.isCancelled.setValue(this.playday.isCancelled);
      this.myForm.controls.numOfHours.setValue(this.playday.numOfHours);
      this.myForm.controls.numOfCourts.setValue(this.playday.numOfCourts);
    }

    //this.myForm.valueChanges.subscribe(console.log);
  }

   getPlayerNameById(id: number) : string {
     var p: IPlayer | undefined = this.allPlayers == null ? undefined : this.allPlayers.find(p => p.id == id);
     return this.getPlayerName(p);
   }
   getPlayerName(p: IPlayer | undefined) : string {
     if (p == null)
       return "?";
     return `${p.lastName}, ${p.firstName}`;
   }

  onSubmit() {
    console.log("Day: " + this.myForm.value.day);
    console.log("playerControl1: " + this.myForm.value.players[0]);
    console.log("playerControl2: " + this.myForm.value.players[1]);
    console.log("playerControl3: " + this.myForm.value.players[2]);
    console.log("playerControl4: " + this.myForm.value.players[3]);
    console.log("playerControl5: " + this.myForm.value.players[4]);
    console.log("isCancelled: " + this.myForm.value.isCancelled);
    console.log("numOfHours: " + this.myForm.value.numOfHours);
    console.log("numOfCourts: " + this.myForm.value.numOfCourts);
    
  }


}
