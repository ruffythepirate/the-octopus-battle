import { AstroidDto } from "./AstroidDto";
import { PlayerDto } from "./PlayerDto";
import { PlayerControls } from "./PlayerControls";


/**
 * Dto that contains the current state of the game. 
**/
export class GameStateDto {
  astroids: AstroidDto[];
  players: PlayerDto[];
  playerControls: PlayerControls[];
  iteration: number;

  constructor() {
    this.astroids = [];
    this.players = [];
    this.playerControls = [];
    this.iteration = 0;
  }

  /**
   * Adds a player to the game state.
   */
  addPlayer(player: PlayerDto) {
    this.players.push(player);
  }

  /**
   * Removes a player from the game state.
   */
  removePlayer(playerId: number) {
    this.players = this.players.filter(player => player.id !== playerId);
  }

  /**
   * Adds an object defining the controls for a player.
   */
  addPlayerControls(playerControls: PlayerControls) {
    this.playerControls.push(playerControls);
  }
}
