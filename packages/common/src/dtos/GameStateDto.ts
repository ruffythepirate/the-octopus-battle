import { AstroidDto } from "./AstroidDto";
import { PlayerDto } from "./PlayerDto";


/**
 * Dto that contains the current state of the game. 
**/
export class GameStateDto {
  astroids: AstroidDto[];
  players: PlayerDto[];

  constructor() {
    this.astroids = [];
    this.players = [];
  }
}