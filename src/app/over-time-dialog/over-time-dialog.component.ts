import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {

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
