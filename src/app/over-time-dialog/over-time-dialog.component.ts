import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-over-time-dialog',
  templateUrl: './over-time-dialog.component.html',
  styleUrls: ['./over-time-dialog.component.scss']
})

export class OverTimeDialogComponent implements OnInit {

data = {
playerOne : 0,
playerTwo : 0,
winner: ''
}

  constructor(@Inject(MAT_DIALOG_DATA) public names: {playerOne:string, playerTwo:string},) { }

  ngOnInit(): void {
    console.log(this.names.playerOne)
  }

  add(player: string){
    if(player == "one"){
      this.data.playerOne += 1;
    }else{
      this.data.playerTwo += 1
    }
  }

  minus(player: string){
    if(player == "one" && this.data.playerOne > 0){
      this.data.playerOne -= 1;
    }else if(this.data.playerTwo > 0){
      this.data.playerTwo -= 1
    }
  }

  selectWinner(player: string){
    this.data.winner = player;
  }
}
