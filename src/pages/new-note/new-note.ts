import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

/*
  Generated class for the NewNote page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.




*/
@Component({
  selector: 'page-new-note',
  templateUrl: 'new-note.html'
})
export class NewNotePage {

  notes: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              af: AngularFire) {
                this.notes = af.database.list('/notes');
              }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewNotePage');
  }

  saveNote() {
        //var canvasElement = angular.element(document.querySelector('#page-6-canvas'));
        var title = document.getElementById("title");
        var note = document.getElementById("note");
        var someData = {
            title: title,
            content: note,
            date: Date()
        };

        this.notes.push(someData);

  }

}
