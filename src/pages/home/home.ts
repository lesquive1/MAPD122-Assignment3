import { Component } from '@angular/core';

import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  notes: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, 
              af: AngularFire, 
              public alertCtrl: AlertController, 
              public actionSheetCtrl: ActionSheetController) {

                this.notes = af.database.list('/notes');

  }

}
