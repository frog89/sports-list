import { NgModule } from '@angular/core';
import { ExtraPay } from '../../model/extrapay.model';
import { Player } from '../../model/player.model';
import { PlayDay } from '../../model/playday.model';
import { AngularFirestoreModule } from 'angularfire2/firestore';

@NgModule({
    declarations: [ 
    ],
    exports: [ 
    ],
    imports: [
      AngularFirestoreModule
    ]
})
export class SharedModule { }