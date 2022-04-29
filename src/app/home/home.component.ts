import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { OverTimeDialogComponent } from '../over-time-dialog/over-time-dialog.component';

export interface Team{
  teamName: string,
  teamScore: number,
  players: any[10], 
}

export interface Match{
  playerOneThrows: number[]
  playerOneTotal: number,
  playerTwoThrows: number[]
  playerTwoTotal: number,
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  currentmatchNumber = 1;

  Matches:any= [];

  teamOne: Team = {
    teamName: 'Team One', teamScore: 0, 
    players:[
      {name:'Hatchet',score: 0,teamScore:0},
      {name:'Hatchet',score: 0,teamScore:0},
      {name:'Duals',score: 0,teamScore:0},
      {name:'Big Axe',score: 0,teamScore:0},
      {name:'Hatchet',score: 0,teamScore:0},
      {name:'Hatchet',score: 0,teamScore:0},
      {name:'Duals',score: 0,teamScore:0},
      {name:'Big Axe',score: 0,teamScore:0},
    ]};

    teamTwo: Team = {
      teamName: 'Team Two', teamScore: 0, 
      players:[
        {name:'Hatchet',score: 0,teamScore:0},
        {name:'Hatchet',score: 0,teamScore:0},
        {name:'Duals',score: 0,teamScore:0},
        {name:'Big Axe',score: 0,teamScore:0},
        {name:'Hatchet',score: 0,teamScore:0},
        {name:'Hatchet',score: 0,teamScore:0},
        {name:'Duals',score: 0,teamScore:0},
        {name:'Big Axe',score: 0,teamScore:0},
      ]};
  half = '1';

  playerOneTotal: any;
  playerTwoTotal: any;


  constructor(private fb:FormBuilder, public dialog: MatDialog) { }

  ngOnInit(): void {

for (let i = 0; i < 8; i++) {
  let tempMatch = {}
  if(i==2 || i==6){
    tempMatch =  {
      playerOneThrows:[0,0,0,0,0,0,0,0,0,0],
      playerOneTotal: 0,
      playerTwoThrows: [0,0,0,0,0,0,0,0,0,0],
      playerTwoTotal: 0,
      currentThrowPlayerOne: 1,
      currentThrowPlayerTwo: 1,
      winnerPoints: false
    };
  }else{
    tempMatch =  {
      playerOneThrows: [0,0,0,0,0],
      playerOneTotal: 0,
      playerTwoThrows: [0,0,0,0,0],
      playerTwoTotal: 0,
      currentThrowPlayerOne: 1,
      currentThrowPlayerTwo: 1,
      winnerPoints: false
    };
  }
  this.Matches.push(tempMatch)
  }
}


  //function to change team names on clicking the existing team name
changeTeamName(team: string){
  if(team == 'one'){
   let name =  prompt('Type your new team name  for ' + this.teamOne.teamName +' here');

    if(name != null && name != ''){
      this.teamOne.teamName = name;
    }
  }

  if(team == 'two'){
    let name =  prompt('Type your new team name  for ' + this.teamTwo.teamName +' here');
    if(name != null && name != ''){
      this.teamTwo.teamName = name;
    }
  }
}
//function to add players to a team when clicking player header
addPlayer(team: string){  
//TODO add multiple name support

  if(team == 'one'){
    if(this.teamOne.players.length == 8){
      alert('You Can not add any more players to ' + this.teamOne.teamName + '.')
      return;
    }
    let player = prompt('Type Player Name you wish to add to ' + this.teamOne.teamName +' here')

    if(player != null){
      if (player.indexOf(',') > -1) { 
        for(const [key, playa] of Object.entries(player.split(','))){
          this.teamOne.players.push({name: playa, score: 0});
        }
      }else{
      this.teamOne.players.push({name: player, score: 0});
      }
    }
  }

  if(team == 'two'){
    if(this.teamTwo.players.length == 8){
      alert('You Can not add any more players to ' + this.teamTwo.teamName + '.')
      return;
    }
    let player = prompt('Type Player Name you wish to add to ' + this.teamTwo.teamName +' here')
    if(player != null){
      if (player.indexOf(',') > -1) { 
        for(const [key, playa] of Object.entries(player.split(','))){
          this.teamTwo.players.push({name: playa, score: 0});
        }
      }else{
      this.teamTwo.players.push({name: player, score: 0});
      }
    }
}
}

//function that will allow you to edit the current players name that you clicked on providing the old players name.
editPlayerName(index: any, team : string){
  if(team == 'one'){
    let name = prompt('You are changing "' + this.teamOne.teamName +'" ' + this.teamOne.players[index].name  + "'s Player name to ")
    if(name != '' && name != null){
    this.teamOne.players[index].name = name
    }
  }

  if(team == 'two'){
    let name = prompt('You are changing "' + this.teamTwo.teamName +'" ' + this.teamOne.players[index].name  + "'s Player name to ")
    if(name != '' && name != null){
      this.teamTwo.players[index].name = name
      }
  }

}

//function that will allow you to edit the current players score that you clicked on providing the old score.
editPlayerScore(index: any, team: string){
  if(team == 'one'){
    let name = prompt('You are changing "' + this.teamOne.players[index].name  + "'s Score  to ")
    this.teamOne.players[index].score = name
    this.teamOne.teamScore = 0;
    for(let test of this.teamOne.players){
      this.teamOne.teamScore += parseInt(test.score);
    }
  }

  if(team == 'two'){
    let name = prompt('You are changing "' + this.teamTwo.players[index].name  + "'s Score  to ")
    this.teamTwo.players[index].score = name
    this.teamTwo.teamScore = 0;
    for(let test of this.teamTwo.players){
      this.teamTwo.teamScore += parseInt(test.score);
  }
}
}

editHalf(){
  let half = prompt("You are changing the half to.")
  if(half){
    this.half = half
  }
}


//Change Current Match you are selected inside of.
selectMatch(matchNumber : number){
  this.currentmatchNumber = matchNumber;
  if(matchNumber >= 5){
    this.half = '2';
  }else{
    this.half = '1';
  }
}

addTeamScore(team: string,points: number){
  if(team == "teamOne"){
    this.teamOne.players[this.currentmatchNumber-1].teamScore += points;
    this.teamOne.teamScore += points;
  }else{
    this.teamTwo.players[this.currentmatchNumber-1].teamScore += points;
    this.teamTwo.teamScore += points;
  }

}

//Will remove last throw on a players side
undoThrow(team: string){
if(team == 'teamOne'){
    if(this.Matches[this.currentmatchNumber-1].currentThrowPlayerOne >= 2){
      let currentThrow = this.Matches[this.currentmatchNumber-1].currentThrowPlayerOne;
      let score = this.Matches[this.currentmatchNumber-1].playerOneThrows[currentThrow-2]
    if(score == 8 || score == 9){
      this.addTeamScore('teamOne',-1)
    }
      this.Matches[this.currentmatchNumber-1].playerOneThrows[currentThrow-2] = 0;
      this.Matches[this.currentmatchNumber-1].playerOneTotal -= score;
      this.Matches[this.currentmatchNumber-1].currentThrowPlayerOne -= 1;
  }
}else{
  if(this.Matches[this.currentmatchNumber-1].currentThrowPlayerTwo >= 2){
    let currentThrow = this.Matches[this.currentmatchNumber-1].currentThrowPlayerTwo;
    let score = this.Matches[this.currentmatchNumber-1].playerTwoThrows[currentThrow-2]
  if(score == 8 || score == 9){
    this.addTeamScore('teamTwo',-1)
  }
    this.Matches[this.currentmatchNumber-1].playerTwoThrows[currentThrow-2] = 0;
    this.Matches[this.currentmatchNumber-1].playerTwoTotal -= score;
    this.Matches[this.currentmatchNumber-1].currentThrowPlayerTwo -= 1;
}
}
}

//will add a score to a players match based on team and button clicked along with throw number?
scoreThrow(team: string,score: any){
    if(team == "teamOne"){
      console.log(this.Matches[this.currentmatchNumber-1].currentThrowPlayerOne)
      if(this.currentmatchNumber == 3 || this.currentmatchNumber == 7){
        const currentThrow = this.Matches[this.currentmatchNumber-1].currentThrowPlayerOne
        if(currentThrow <= 10 ){
          if(score == 'D'){
            this.Matches[this.currentmatchNumber-1].playerOneThrows[currentThrow-1] = 'D';
            this.Matches[this.currentmatchNumber-1].playerOneTotal += 0;
            this.Matches[this.currentmatchNumber-1].currentThrowPlayerOne++;
            }else{
              this.Matches[this.currentmatchNumber-1].playerOneThrows[currentThrow-1] = score;
              this.Matches[this.currentmatchNumber-1].playerOneTotal += score;
              this.Matches[this.currentmatchNumber-1].currentThrowPlayerOne++;

                        //Checking If you Hit a Killshot
                        if(score == 8 || score === 9){this.addTeamScore(team,1);}

                        //Checking If Game Score for Player One is 68
                        if(this.Matches[this.currentmatchNumber-1].playerOneTotal >= 68 && this.Matches[this.currentmatchNumber-1].currentThrowPlayerOne == 11){
                          this.addTeamScore(team,2);
                        }
          }

        }
      }else{
        const currentThrow = this.Matches[this.currentmatchNumber-1].currentThrowPlayerOne
        if(currentThrow <= 5 ){
          if(score == 'D'){
            this.Matches[this.currentmatchNumber-1].playerOneThrows[currentThrow-1] = 'D';
            this.Matches[this.currentmatchNumber-1].playerOneTotal += 0;
            this.Matches[this.currentmatchNumber-1].currentThrowPlayerOne++;
          }else{
          //Adding and Displaying Points

            this.Matches[this.currentmatchNumber-1].playerOneThrows[currentThrow-1] = score;
            this.Matches[this.currentmatchNumber-1].playerOneTotal += score;
            this.Matches[this.currentmatchNumber-1].currentThrowPlayerOne++;


          //Checking If you Hit a Killshot
          if(score == 8){this.addTeamScore(team,1);}

          //Checking If Game Score for Player One is 34
          if(this.Matches[this.currentmatchNumber-1].playerOneTotal == 34 && this.Matches[this.currentmatchNumber-1].currentThrowPlayerOne == 6){
            this.addTeamScore(team,2);
          }
        }
        }
      }
      //TEAM TWO SCORING BELOW
    }else{
      console.log(this.Matches[this.currentmatchNumber-1].currentThrowPlayerTwo)
      if(this.currentmatchNumber == 3 || this.currentmatchNumber == 7){
        const currentThrow = this.Matches[this.currentmatchNumber-1].currentThrowPlayerTwo
        if(currentThrow <= 10 ){
          if(score == 'D'){
            this.Matches[this.currentmatchNumber-1].playerTwoThrows[currentThrow-1] = 'D';
            this.Matches[this.currentmatchNumber-1].playerTwoTotal += 0;
            this.Matches[this.currentmatchNumber-1].currentThrowPlayerTwo++;
          }else{
            this.Matches[this.currentmatchNumber-1].playerTwoThrows[currentThrow-1] = score;
            this.Matches[this.currentmatchNumber-1].playerTwoTotal += score;
            this.Matches[this.currentmatchNumber-1].currentThrowPlayerTwo++;

              //Checking If you Hit a Killshot
            if(score == 8 || score === 9){this.addTeamScore(team,1);}

            //Checking If Game Score for Player One is 68 or higher
            if(this.Matches[this.currentmatchNumber-1].playerTwoTotal >= 68 && this.Matches[this.currentmatchNumber-1].currentThrowPlayerTwo == 11){
              this.addTeamScore(team,2);
            }
          }
      }
      }else{
        const currentThrow = this.Matches[this.currentmatchNumber-1].currentThrowPlayerTwo
        if(currentThrow <= 5 ){
          if(score == 'D'){
            this.Matches[this.currentmatchNumber-1].playerTwoThrows[currentThrow-1] = 'D';
            this.Matches[this.currentmatchNumber-1].playerTwoTotal += 0;
            this.Matches[this.currentmatchNumber-1].currentThrowPlayerTwo++;
          }else{
          //Adding and Displaying Points

            this.Matches[this.currentmatchNumber-1].playerTwoThrows[currentThrow-1] = score;
            this.Matches[this.currentmatchNumber-1].playerTwoTotal += score;
            this.Matches[this.currentmatchNumber-1].currentThrowPlayerTwo++;


            //Checking If you Hit a Killshot
            if(score == 8){this.addTeamScore(team,1);}

            //Checking If Game Score for Player One is 34
            if(this.Matches[this.currentmatchNumber-1].playerTwoTotal == 34 && this.Matches[this.currentmatchNumber-1].currentThrowPlayerTwo == 6){
              this.addTeamScore(team,2);
            }
        }
        }
      }

      //NORMAL WIN BONUS SCORING
    if(this.currentmatchNumber != 3 && this.currentmatchNumber != 7){
      if(this.Matches[this.currentmatchNumber-1].currentThrowPlayerTwo == 6 && this.Matches[this.currentmatchNumber-1].currentThrowPlayerOne == 6){
        //SCORE IS TIED
        if(this.Matches[this.currentmatchNumber-1].playerOneTotal == this.Matches[this.currentmatchNumber-1].playerTwoTotal 
          && this.Matches[this.currentmatchNumber-1].winnerPoints == false){
            let dialogRef = this.dialog.open(OverTimeDialogComponent, {
              height: '250px',
              width: '600px',
              disableClose: true,
              data: {
                playerOne: this.teamOne.players[this.currentmatchNumber-1].name,
                playerTwo: this.teamTwo.players[this.currentmatchNumber-1].name
              }
            });
            dialogRef.afterClosed().subscribe(result => {
              if(result.playerOne > 0){
                this.addTeamScore('teamOne', result.playerOne)
              }
              if(result.playerTwo > 0){
                this.addTeamScore('teamTwo', result.playerTwo)
              }
              this.addTeamScore(result.winner,4)
            });
          }

        //Player One Wins + 4
        if(this.Matches[this.currentmatchNumber-1].playerOneTotal > this.Matches[this.currentmatchNumber-1].playerTwoTotal && this.Matches[this.currentmatchNumber-1].winnerPoints == false){
          this.addTeamScore('teamOne',4);
          this.Matches[this.currentmatchNumber-1].winnerPoints = true;
        }

        //Player Two Wins + 4;
        if(this.Matches[this.currentmatchNumber-1].playerOneTotal < this.Matches[this.currentmatchNumber-1].playerTwoTotal && this.Matches[this.currentmatchNumber-1].winnerPoints == false){
          this.addTeamScore('teamTwo',4);
          this.Matches[this.currentmatchNumber-1].winnerPoints = true;
        }
      }
  }else{
    if(this.Matches[this.currentmatchNumber-1].currentThrowPlayerTwo == 11 && this.Matches[this.currentmatchNumber-1].currentThrowPlayerOne == 11){
      //Player One Wins + 4
      if(this.Matches[this.currentmatchNumber-1].playerOneTotal > this.Matches[this.currentmatchNumber-1].playerTwoTotal && this.Matches[this.currentmatchNumber-1].winnerPoints == false){
        this.addTeamScore('teamOne',4);
        this.Matches[this.currentmatchNumber-1].winnerPoints = true;
      }

      //Player Two Wins + 4;
      if(this.Matches[this.currentmatchNumber-1].playerOneTotal < this.Matches[this.currentmatchNumber-1].playerTwoTotal && this.Matches[this.currentmatchNumber-1].winnerPoints == false){
        this.addTeamScore('teamTwo',4);
        this.Matches[this.currentmatchNumber-1].winnerPoints = true;
      }
    }
  }

  }
}

}

