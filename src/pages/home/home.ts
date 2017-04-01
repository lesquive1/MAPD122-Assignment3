import { Component } from '@angular/core';

import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

//import {HomePage} from 'start';
//import {Page} from 'ionic-angular';
import {NewNotePage} from '../new-note/new-note';

//import {Page} from 'ionic-angular';
//import {AboutPage} from '../about/about';

import { SocialSharing } from '@ionic-native/social-sharing';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  notes: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, 
              public af: AngularFire, 
              public alertCtrl: AlertController, 
              public actionSheetCtrl: ActionSheetController,
              public socialSharing: SocialSharing) {

                this.notes = af.database.list('/notes');

  }

    goToOtherPage() {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.push(NewNotePage);
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
            placeholder: "new note",
            type: "textarea"
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

  showOptions(noteId, title, content){
    let actionSheet = this.actionSheetCtrl.create(
      {
        title:"What do you want to do?",
        buttons:[
          {
            text:"Delete",
            role:"destructive",
            handler:()=>{
              this.removeItem(noteId);
            }
          },{
            text:"Share",
            handler:()=>{
              this.shareNote(title, content);
            }
          },
          {
            text:"Cancel",
            role: "cancel",
            handler:()=>{
              console.log("Cancel");
            }
          }
        ]
      }
    );
    actionSheet.present();
  }

    removeItem(noteId: string){
    console.log(noteId);
    this.notes.remove(noteId);
  }

  shareNote(title: string, content: string){
    let mShare = this.socialSharing.share(title, content);


    // var mnote: FirebaseListObservable<any[]>;
    // mnote = this.af.database.list('/notes', {
    //   query: {
    //     equalTo: noteId
    //   }
    // });

    //console.log(noteId);
    //console.log(mShare);
  }

}


