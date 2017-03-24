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

  addItem(){
    let prompt = this.alertCtrl.create(
      {
        title: 'New Note',
        message:"Enter the title and the note",
        inputs: [
          {
            name: "title",
            placeholder: "new title"
          },
          {
            name: "content",
            placeholder: "new note"
          },
          {
            name: "date",
            value: Date(),
            type: "hidden"
          }
        ],
        buttons: [
          {
            text:'Cancel',
            handler: data=>{
              console.log('Cancel clicked');
            }
          },
          {
            text: "Save",
            handler: data => {
              console.log(data);
              //data.push({"date": "today"});
              //data.push({date: "today"});
              this.notes.push(
                data
              );
            }
          }
        ]
      }
    );
    prompt.present();
  }  

}
