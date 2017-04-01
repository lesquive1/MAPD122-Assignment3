import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import { HomePage } from '../home/home';

// import { Note } from './note';


@Component({
  selector: 'page-new-note',
  templateUrl: 'new-note.html'
})
export class NewNotePage {

  notes: FirebaseListObservable<any[]>;

  private todo : FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              af: AngularFire,
              private formBuilder: FormBuilder ) {
                this.notes = af.database.list('/notes');
                this.todo = this.formBuilder.group({
                      title: ['', Validators.required],
                      content: [''],
                      date: Date(),
                });
              }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewNotePage');
  }

  logForm(){

    this.notes.push( this.todo.value );
    console.log(this.todo.value);
    this.navCtrl.popTo(HomePage);
  }

}