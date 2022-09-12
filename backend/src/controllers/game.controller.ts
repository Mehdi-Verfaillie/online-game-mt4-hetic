import { letters } from '@/constants/letters';
import { Game, NextRoundEvent, RoundEvent } from '@/interfaces/game/game';
import Dictionary from '@/services/dictionary';
import { randomFromArray, remove } from '@/utils/util';
import { Socket, Server as SocketServer } from 'socket.io';
import SocketController from './socket.controller';

/*
  |--------------------------------------------------------------------------
  | GameController
  |--------------------------------------------------------------------------
  |
  | The purpose of this controller is to provide methods to control the game flow
  | from the server.
  |
  |
*/
export default class GameController {
  private server: SocketServer;
  private socketController: SocketController;
  private MAX_PLAYERS = 6;
  private MAX_ROUND_TIME = 15000; // ms
  private game: Game = { id: null, players: [], status: 'unavailable', hint: randomFromArray(letters) };

  constructor(server: SocketServer) {
    this.server = server;
    this.socketController = new SocketController();
  }

  public init() {
    this.server.on('connection', socket => {
      this.socketController.connection(socket);

      /**
       * Create the room if 'create:room' event is sent by the client
       */
      socket.on('create:room', ({ name }: { name: string }) => this.create(socket, name));

      /**
       * Join the room if 'join:room' event is sent by the client
       */
      socket.on('join:room', async ({ name, room }: { name: string; room: string }) => await this.join(socket, room, name));

      /**
       * Start the game if 'start:game' event is sent by the client
       */
      socket.on('start:game', () => this.start(socket));

      /**
       * We listen for the countdown event to avoid the server to send to much event
       * (number of live game * number of round * number of second of the timer)
       * witch could lead to server memory leak.
       */
      socket.on('end:countdown', () => this.round('end:countdown'));

      /**
       *
       */
      socket.on('try:answer', ({ word }: { word: string }) => this.round('try:answer', word, socket));
    });
  }

  /*
    |--------------------------------------------------------------------------
    | private create method
    |--------------------------------------------------------------------------
    |
    | The purpose of this method is to add the current player to the list of
    | players (on his own room) and return the room_id (socket.id) to the client.
    |
    | On success we create the room, push the player to the list of players
    | and emit a success event.
    | On fail we return an error message saying that the name does not exist.
    |
  */
  private create(socket: Socket, name: string) {
    if (!name) {
      socket.emit('create:room:error', { message: 'name property does not exist.' });
      return;
    }

    this.game.id = socket.id;
    this.game.status = 'available';
    this.game.players = [{ id: socket.id, name, role: 'owner', lifePoint: 3, isPlayingRound: true }];

    socket.emit('create:room:success', { players: this.game.players, roomId: socket.id });
  }

  /*
    |--------------------------------------------------------------------------
    | private async join method
    |--------------------------------------------------------------------------
    |
    | The purpose of this method is to, first verify if the room_id passed in
    | param exist on the server. This room_id come from the client page url
    | previously generated by an another player thanks to the create method.
    |
    | On success we join the room, push the player to the list of players
    | and emit a success event.
    | On fail we return an error message saying that the room or name does not exist.
    |
  */
  private async join(socket: Socket, room: string, name: string) {
    if (this.game.status !== 'available') {
      socket.emit('join:room:error', { message: 'The room is not available.' });
      return;
    }

    if (!this.server.sockets.adapter.rooms.has(room) || !name) {
      socket.emit('join:room:error', { message: `${!name ? 'name property' : 'room'}  does not exist.` });
      return;
    }

    if (this.game.players.length >= this.MAX_PLAYERS) {
      socket.emit('join:room:error', { message: 'Maximum number of players reached.' });
      return;
    }

    await socket.join(room);

    this.game.players.push({ id: socket.id, name, role: 'member', lifePoint: 3, isPlayingRound: false });

    this.server.sockets.to(this.game.id).emit('join:room:success', {
      players: this.game.players,
    });
  }

  /*
    |--------------------------------------------------------------------------
    | private start(game) method
    |--------------------------------------------------------------------------
    |
    | The purpose of this method is to start the game with all registered players
    | and change the game status to 'ongoing'.
    |
  */
  private start(socket: Socket) {
    if (socket.id !== this.game.players[0].id) {
      socket.emit('start:game:error', { message: "You're not the owner of the room." });
      return;
    }

    if (this.game.players.length <= 1) {
      socket.emit('start:game:error', { message: `Insufficient number of players. (${this.game.players.length})` });
      return;
    }

    this.game.status = 'ongoing';

    this.server.sockets.to(this.game.id).emit('start:game:success', {
      hint: this.game.hint,
      countdown: this.MAX_ROUND_TIME,
    });
  }

  /*
    |--------------------------------------------------------------------------
    | private round(game) method
    |--------------------------------------------------------------------------
    |
    | The purpose of this method is to manage rounds of the game and wait for
    | the coundown to be end or the answer to be right
    |
  */
  private round(event: RoundEvent, answer?: string, socket?: Socket) {
    if (socket && !answer) {
      socket.emit('try:answer:error', { message: 'No answer provided.' });
      return;
    }

    if (event === 'end:countdown') {
      this.nextRound('end:round:fail');
      this.game.hint = randomFromArray(letters);
      return;
    }

    if (event === 'try:answer') this.evaluateAnswer(answer.toLowerCase());
  }

  /*
    |--------------------------------------------------------------------------
    | private nextRound(game) method
    |--------------------------------------------------------------------------
    |
    | The purpose of this method is to manage round flow only.
    | We identify who is the current player and who's the next one.
    |
    | The next round is defined by who's playing
  */

  // FIXME: Currently wanever who send the 'end:countdown' event, the next player lose 1 life point
  // It's better to seach for the current player using his id from client (passed to the event on)
  private nextRound(event: NextRoundEvent) {
    const current = this.game.players.findIndex(player => player.isPlayingRound === true);
    let next = current + 1;

    // We comeback to the first element on the list if all players have alread played
    if (next > this.game.players.length - 1) {
      next = 0;
      this.game.players[next].isPlayingRound = true;
    }

    if (event === 'end:round:success') {
      this.game.players[next].isPlayingRound = true;
      this.game.players[current].isPlayingRound = false;
      this.game.hint = randomFromArray(letters);
    }

    if (event === 'end:round:fail') {
      this.game.players[current].isPlayingRound = false;
      this.game.players[current].lifePoint -= 1;

      // We verify if the current player is eliminated
      if (this.game.players[current].lifePoint === 0) {
        remove(current).from(this.game.players);
        next = current;

        if (this.game.players.length === 1) {
          this.server.sockets.emit('end:game', { players: this.game.players });
        }
      }

      this.game.players[next].isPlayingRound = true;
    }

    this.server.sockets.emit(event, { players: this.game.players, hint: this.game.hint });
  }

  private async evaluateAnswer(answer?: string) {
    if (!answer.includes(this.game.hint)) {
      this.server.sockets.emit('try:answer:fail', {});
      return;
    }

    if (!(await new Dictionary(answer).isWordExist)) {
      this.server.sockets.emit('try:answer:fail', {});
      return;
    }

    this.nextRound('end:round:success');
  }
}
